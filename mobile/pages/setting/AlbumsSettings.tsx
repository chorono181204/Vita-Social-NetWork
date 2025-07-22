import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import MainLayout from '@/components/layouts/Main/MainLayout';
import SettingListItem from '@/components/elements/Setting';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '@/theme';

const { width } = Dimensions.get('window');
const albumSize = (width - spacing.lg * 3 - spacing.md) / 2;

interface Album {
  id: string;
  name: string;
  coverImage: string;
  photoCount: number;
  lastUpdated: string;
  isPrivate: boolean;
}

export default function AlbumsSettings() {
  // Mock albums data
  const [albums] = useState<Album[]>([
    {
      id: '1',
      name: 'Recipe Photos',
      coverImage: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
      photoCount: 87,
      lastUpdated: '2 days ago',
      isPrivate: false,
    },
    {
      id: '2',
      name: 'Cooking Process',
      coverImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      photoCount: 45,
      lastUpdated: '1 week ago',
      isPrivate: false,
    },
    {
      id: '3',
      name: 'My Kitchen',
      coverImage: 'https://images.unsplash.com/photo-1556909284-f2e6e1334e9c?w=400',
      photoCount: 23,
      lastUpdated: '3 days ago',
      isPrivate: true,
    },
    {
      id: '4',
      name: 'Restaurant Visits',
      coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
      photoCount: 156,
      lastUpdated: '5 days ago',
      isPrivate: false,
    },
  ]);

  const totalPhotos = albums.reduce((sum, album) => sum + album.photoCount, 0);
  const privateAlbums = albums.filter(album => album.isPrivate).length;

  const handleCreateAlbum = () => {
    Alert.alert('Create Album', 'Create new album functionality will be implemented');
  };

  const handleViewAlbum = (albumId: string, albumName: string) => {
    console.log(`View album: ${albumId} - ${albumName}`);
  };

  const handleDeleteAlbum = (albumId: string, albumName: string) => {
    Alert.alert(
      'Delete Album',
      `Are you sure you want to delete "${albumName}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => console.log(`Deleted album: ${albumId}`)
        }
      ]
    );
  };

  const AlbumCard = ({ album }: { album: Album }) => (
    <TouchableOpacity 
      style={styles.albumCard}
      onPress={() => handleViewAlbum(album.id, album.name)}
    >
      <View style={styles.albumImageContainer}>
        <Image source={{ uri: album.coverImage }} style={styles.albumImage} />
        {album.isPrivate && (
          <View style={styles.privateIndicator}>
            <Ionicons name="lock-closed" size={12} color={colors.white} />
          </View>
        )}
        <View style={styles.photoCountOverlay}>
          <Text style={styles.photoCountText}>{album.photoCount}</Text>
        </View>
      </View>
      
      <View style={styles.albumInfo}>
        <Text style={styles.albumName} numberOfLines={1}>{album.name}</Text>
        <Text style={styles.albumLastUpdated}>{album.lastUpdated}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.albumMenuButton}
        onPress={() => handleDeleteAlbum(album.id, album.name)}
      >
        <Ionicons name="ellipsis-horizontal" size={16} color={colors.gray} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <MainLayout 
      activeTab="profile"
      headerProps={{
        variant: 'default',
        title: 'Albums',
        showBackButton: true,
        onBackPress: () => console.log('Back pressed'),
        rightButton: {
          icon: 'add',
          onPress: handleCreateAlbum
        }
      }}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Storage Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Storage Overview</Text>
          
          <View style={styles.storageStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{albums.length}</Text>
              <Text style={styles.statLabel}>Albums</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalPhotos}</Text>
              <Text style={styles.statLabel}>Photos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{privateAlbums}</Text>
              <Text style={styles.statLabel}>Private</Text>
            </View>
          </View>
        </View>

        {/* Album Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Album Settings</Text>
          
          <SettingListItem
            leftIcon={<Ionicons name="cloud-upload-outline" size={24} color={colors.green} />}
            title="Auto Backup"
            subtitle="Automatically backup new photos"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Auto backup settings')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="resize-outline" size={24} color={colors.green} />}
            title="Photo Quality"
            subtitle="High quality (Original size)"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Photo quality settings')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="download-outline" size={24} color={colors.green} />}
            title="Download Options"
            subtitle="Choose download quality and format"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Download settings')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="share-outline" size={24} color={colors.green} />}
            title="Sharing Permissions"
            subtitle="Control who can view your albums"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Sharing settings')}
          />
        </View>

        {/* Organization */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Organization</Text>
          
          <SettingListItem
            leftIcon={<Ionicons name="folder-outline" size={24} color={colors.green} />}
            title="Create Album"
            subtitle="Organize your photos into albums"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={handleCreateAlbum}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="pricetags-outline" size={24} color={colors.green} />}
            title="Auto-tag Photos"
            subtitle="Automatically organize by content"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Auto-tag settings')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="calendar-outline" size={24} color={colors.green} />}
            title="Sort by Date"
            subtitle="Organize photos chronologically"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Sort settings')}
          />
        </View>

        {/* Storage Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Storage Management</Text>
          
          <SettingListItem
            leftIcon={<Ionicons name="analytics-outline" size={24} color={colors.blue} />}
            title="Storage Usage"
            subtitle="2.3 GB of 15 GB used"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Storage usage')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="trash-outline" size={24} color={colors.orange} />}
            title="Recently Deleted"
            subtitle="12 photos • Delete permanently in 29 days"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => console.log('Recently deleted')}
          />
          
          <SettingListItem
            leftIcon={<Ionicons name="refresh-outline" size={24} color={colors.green} />}
            title="Free Up Space"
            subtitle="Remove large files and duplicates"
            rightIcon={<Ionicons name="chevron-forward" size={22} color={colors.gray} />}
            onPress={() => Alert.alert('Free Up Space', 'Space optimization completed')}
          />
        </View>

        {/* My Albums */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Albums</Text>
            <TouchableOpacity onPress={() => console.log('View all albums')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.albumsGrid}>
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </View>
        </View>

      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.blackGray,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.green,
    fontWeight: '500',
  },
  storageStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.blackGray,
  },
  statLabel: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
  albumsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  albumCard: {
    width: albumSize,
    backgroundColor: colors.white,
  },
  albumImageContainer: {
    position: 'relative',
    marginBottom: spacing.sm,
  },
  albumImage: {
    width: albumSize,
    height: albumSize,
    borderRadius: radius.md,
  },
  privateIndicator: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoCountOverlay: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  photoCountText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  albumInfo: {
    flex: 1,
  },
  albumName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blackGray,
    marginBottom: 4,
  },
  albumLastUpdated: {
    fontSize: 12,
    color: colors.gray,
  },
  albumMenuButton: {
    position: 'absolute',
    top: albumSize + spacing.sm,
    right: 0,
    padding: spacing.xs,
  },
}); 