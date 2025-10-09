import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  FlatList,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface AddFriendsProps {
  onBack: () => void;
}

interface Friend {
  id: number;
  name: string;
  username: string;
  avatar: string;
  mutualFriends: number;
  isFollowing: boolean;
}

export function AddFriends({ onBack }: AddFriendsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'invite' | 'suggested'>('suggested');

  // Mock suggested friends data
  const [suggestedFriends, setSuggestedFriends] = useState<Friend[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      username: '@sarah_j',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Sarah',
      mutualFriends: 5,
      isFollowing: false
    },
    {
      id: 2,
      name: 'Mike Chen',
      username: '@mikec',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Mike',
      mutualFriends: 3,
      isFollowing: false
    },
    {
      id: 3,
      name: 'Emily Davis',
      username: '@emily_d',
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Emily',
      mutualFriends: 8,
      isFollowing: false
    }
  ]);

  const handleFollow = (friendId: number) => {
    setSuggestedFriends(friends => 
      friends.map(friend =>
        friend.id === friendId 
          ? { ...friend, isFollowing: !friend.isFollowing }
          : friend
      )
    );
    
    const friend = suggestedFriends.find(f => f.id === friendId);
    if (friend) {
      Alert.alert(
        friend.isFollowing ? 'Unfollowed' : 'Following',
        `You are now ${friend.isFollowing ? 'not following' : 'following'} ${friend.name}`
      );
    }
  };

  const handleInviteFriends = () => {
    Alert.alert('Invite Friends', 'Feature coming soon!');
  };

  const filteredFriends = suggestedFriends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderFriend = ({ item }: { item: Friend }) => (
    <View style={styles.friendCard}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.friendUsername}>{item.username}</Text>
        <Text style={styles.mutualFriends}>{item.mutualFriends} mutual friends</Text>
      </View>
      <TouchableOpacity
        style={[styles.followButton, item.isFollowing && styles.followingButton]}
        onPress={() => handleFollow(item.id)}
      >
        <Text style={[styles.followButtonText, item.isFollowing && styles.followingButtonText]}>
          {item.isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Friends</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search friends..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholderTextColor="#999"
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {(['suggested', 'search', 'invite'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'suggested' && (
          <FlatList
            data={filteredFriends}
            renderItem={renderFriend}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.friendsList}
          />
        )}

        {activeTab === 'search' && (
          <View style={styles.searchTab}>
            <Text style={styles.searchMessage}>
              {searchTerm ? `Searching for "${searchTerm}"...` : 'Enter a name to search for friends'}
            </Text>
          </View>
        )}

        {activeTab === 'invite' && (
          <View style={styles.inviteTab}>
            <View style={styles.inviteCard}>
              <Ionicons name="people" size={48} color="#667eea" />
              <Text style={styles.inviteTitle}>Invite Your Friends</Text>
              <Text style={styles.inviteDescription}>
                Share KyoolApp with your friends and start your health journey together!
              </Text>
              <TouchableOpacity style={styles.inviteButton} onPress={handleInviteFriends}>
                <Text style={styles.inviteButtonText}>Send Invites</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#667eea',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  content: {
    flex: 1,
  },
  friendsList: {
    paddingHorizontal: 16,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  friendUsername: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  mutualFriends: {
    fontSize: 12,
    color: '#999',
  },
  followButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#667eea',
    borderRadius: 20,
  },
  followingButton: {
    backgroundColor: '#e0e0e0',
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  followingButtonText: {
    color: '#666',
  },
  searchTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  searchMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  inviteTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  inviteCard: {
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inviteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  inviteDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  inviteButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  inviteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});