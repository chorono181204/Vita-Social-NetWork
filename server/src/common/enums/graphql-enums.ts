import { registerEnumType } from '@nestjs/graphql';
import { Role, Gender, CookingLevel, PostType, Difficulty, RecipeCategory } from '@prisma/client';

registerEnumType(Role, { name: 'Role', description: 'User role' });
registerEnumType(Gender, { name: 'Gender', description: 'User gender' });
registerEnumType(CookingLevel, { name: 'CookingLevel', description: 'User cooking level' });
registerEnumType(PostType, { name: 'PostType', description: 'Post type' });
registerEnumType(Difficulty, { name: 'Difficulty', description: 'Recipe difficulty' });
registerEnumType(RecipeCategory, { name: 'RecipeCategory', description: 'Recipe category' }); 