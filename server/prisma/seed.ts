import { PrismaClient } from '@prisma/client';
import * as faker from 'faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const USER_COUNT = 10;
const POSTS_PER_USER = 4; // 2 status, 2 recipe
const COMMENTS_PER_POST = 3;
const LIKES_PER_POST = 3;
const SAVES_PER_POST = 2;
const FOLLOWS_PER_USER = 3;
const PASSWORD = 'secret';
const SALT_ROUNDS = 10;

const recipeCategories = [
  'BREAKFAST', 'LUNCH', 'DINNER', 'DESSERT', 'SNACK', 'APPETIZER', 'MAIN_COURSE', 'SIDE_DISH', 'BEVERAGE', 'SALAD', 'SOUP', 'SAUCE', 'HEALTHY', 'VEGETARIAN', 'VEGAN', 'GLUTEN_FREE', 'KETO', 'LOW_CARB',
];
const difficulties = ['EASY', 'MEDIUM', 'HARD'];
const units = ['GRAMS', 'ML', 'PIECES', 'TBSP', 'TSP', 'CUP','OZ','LB','G','KG'];

async function main() {
  await prisma.save.deleteMany();
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.post.deleteMany();
  await prisma.userProfile.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash(PASSWORD, SALT_ROUNDS);

  // 1. Seed users & profiles
  const users = [];
  for (let i = 0; i < USER_COUNT; i++) {
    const username = faker.internet.userName().toLowerCase() + i;
    const email = faker.internet.email(username);
    const role = i === 0 ? 'ADMIN' : (i % 3 === 0 ? 'CHEF' : 'USER');
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: passwordHash,
        role,
        isVerified: faker.datatype.boolean(),
        isActive: true,
        profile: {
          create: {
            dietaryPreferences: faker.random.arrayElements(['vegetarian', 'vegan', 'gluten-free', 'keto'], faker.datatype.number({min:0,max:2})),
            cuisinePreferences: faker.random.arrayElements(['italian', 'asian', 'mexican', 'french', 'indian'], faker.datatype.number({min:0,max:2})),
            cookingLevel: faker.random.arrayElement(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
            healthGoals: faker.random.arrayElements(['weight-loss', 'muscle-gain', 'healthy-eating'], faker.datatype.number({min:0,max:2})),
            allergies: faker.random.arrayElements(['nuts', 'dairy', 'gluten', 'seafood'], faker.datatype.number({min:0,max:2})),
            followersCount: 0,
            followingCount: 0,
            postsCount: 0,
          },
        },
      },
      include: { profile: true },
    });
    users.push(user);
  }

  // 2. Seed posts (status & recipe)
  const posts = [];
  for (const user of users) {
    for (let i = 0; i < POSTS_PER_USER; i++) {
      let post;
      if (i % 2 === 0) {
        // Status post
        post = await prisma.post.create({
          data: {
            type: 'STATUS',
            content: {
              content: faker.lorem.sentences(2),
              images: [faker.image.food(), faker.image.food()],
            },
            title: faker.lorem.sentence(3),
            authorId: user.id,
            published: true,
            tags: faker.lorem.words(3).split(' '),
          },
        });
      } else {
        // Recipe post
        const ingredients = Array.from({ length: faker.datatype.number({ min: 3, max: 7 }) }, () => ({
          name: faker.commerce.product(),
          amount: faker.datatype.number({ min: 10, max: 500 }),
          unit: faker.random.arrayElement(units),
          calories: faker.datatype.number({ min: 10, max: 300 }),
        }));
        post = await prisma.post.create({
          data: {
            type: 'RECIPE',
            content: {
              caption: faker.lorem.sentence(),
              recipe: {
                title: faker.commerce.productName(),
                description: faker.lorem.sentences(2),
                category: faker.random.arrayElement(recipeCategories),
                difficulty: faker.random.arrayElement(difficulties),
                cookingTime: faker.datatype.number({ min: 10, max: 120 }),
                servings: faker.datatype.number({ min: 1, max: 8 }),
                image: faker.image.food(),
                ingredients,
                instructions: Array.from({ length: faker.datatype.number({ min: 3, max: 7 }) }, () => faker.lorem.sentence()),
                tags: faker.lorem.words(3).split(' '),
              },
            },
            title: faker.commerce.productName(),
            difficulty: faker.random.arrayElement(difficulties),
            category: faker.random.arrayElement(recipeCategories),
            tags: faker.lorem.words(3).split(' '),
            cuisine: faker.random.arrayElement(['italian', 'asian', 'mexican', 'french', 'indian']),
            authorId: user.id,
            published: true,
          },
        });
      }
      posts.push(post);
    }
  }

  // 3. Seed follows (each user follow FOLLOWS_PER_USER random users)
  for (const user of users) {
    const others = users.filter(u => u.id !== user.id);
    const follows = faker.random.arrayElements(others, Math.min(FOLLOWS_PER_USER, others.length));
    for (const followee of follows) {
      await prisma.follow.create({
        data: {
          followerId: user.id,
          followingId: followee.id,
        },
      });
    }
  }

  // 4. Seed likes, comments, saves
  for (const post of posts) {
    // Likes
    const likeUsers = faker.random.arrayElements(users, Math.min(LIKES_PER_POST, users.length));
    for (const user of likeUsers) {
      await prisma.like.create({
        data: {
          userId: user.id,
          postId: post.id,
        },
      });
    }
    // Saves
    const saveUsers = faker.random.arrayElements(users, Math.min(SAVES_PER_POST, users.length));
    for (const user of saveUsers) {
      await prisma.save.create({
        data: {
          userId: user.id,
          postId: post.id,
        },
      });
    }
    // Comments (gốc)
    const commentUsers = faker.random.arrayElements(users, Math.min(COMMENTS_PER_POST, users.length));
    const rootComments = [];
    for (const user of commentUsers) {
      const comment = await prisma.comment.create({
        data: {
          content: faker.lorem.sentence(),
          userId: user.id,
          postId: post.id,
        },
      });
      rootComments.push(comment);
    }
    // Reply cho mỗi comment gốc
    for (const parent of rootComments) {
      const replyCount = faker.datatype.number({ min: 1, max: 2 });
      for (let i = 0; i < replyCount; i++) {
        const replyUser = faker.random.arrayElement(users);
        await prisma.comment.create({
          data: {
            content: faker.lorem.sentence(),
            userId: replyUser.id,
            postId: post.id,
            parentId: parent.id,
          },
        });
      }
    }
  }

  console.log('Seeded', users.length, 'users,', posts.length, 'posts.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
