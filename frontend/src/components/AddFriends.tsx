import React, { useState } from 'react';import React, { useState } from 'react';

import { import { 

  View,   View, 

  Text,   Text, 

  ScrollView,   ScrollView, 

  TextInput,   TextInput, 

  TouchableOpacity,   TouchableOpacity, 

  StyleSheet,   StyleSheet, 

  SafeAreaView,  SafeAreaView,

  Alert,  Alert,

  FlatList,  FlatList,

  Image  Image

} from 'react-native';} from 'react-native';

import { Ionicons } from '@expo/vector-icons';import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';

interface AddFriendsProps {

  onBack: () => void;interface AddFriendsProps {

}  onBack: () => void;

}

interface Friend {

  id: number;interface Friend {

  name: string;  id: number;

  username: string;  name: string;

  avatar: string;  username: string;

  mutualFriends: number;  avatar: string;

  isFollowing: boolean;  mutualFriends: number;

}  isFollowing: boolean;

}

export function AddFriends({ onBack }: AddFriendsProps) {

  const [searchTerm, setSearchTerm] = useState('');export function AddFriends({ onBack }: AddFriendsProps) {

  const [activeTab, setActiveTab] = useState<'search' | 'invite' | 'suggested'>('suggested');  const [searchTerm, setSearchTerm] = useState('');

  const [activeTab, setActiveTab] = useState<'search' | 'invite' | 'suggested'>('suggested');

  // Mock suggested friends data

  const suggestedFriends: Friend[] = [  // Mock suggested friends data

    {  const suggestedFriends: Friend[] = [

      id: 1,    {

      name: 'Sarah Johnson',      id: 1,

      username: '@sarah_j',      name: 'Sarah Johnson',

      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',      username: '@sarah_j',

      mutualFriends: 5,      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',

      isFollowing: false      mutualFriends: 5,

    },      isFollowing: false

    {    },

      id: 2,    {

      name: 'Mike Chen',      id: 2,

      username: '@mike_fitness',      name: 'Mike Chen',

      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',      username: '@mike_fitness',

      mutualFriends: 3,      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',

      isFollowing: false      mutualFriends: 3,

    },      isFollowing: false

    {    },

      id: 3,    {

      name: 'Emma Davis',      id: 3,

      username: '@emma_healthy',      name: 'Emma Davis',

      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',      username: '@emma_healthy',

      mutualFriends: 8,      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',

      isFollowing: false      mutualFriends: 8,

    }      isFollowing: false

  ];    }

  ];

  const [friends, setFriends] = useState(suggestedFriends);

  const [friends, setFriends] = useState(suggestedFriends);

  const handleFollow = (friendId: number) => {

    setFriends(friends.map(friend =>   const handleFollow = (friendId: number) => {

      friend.id === friendId     setFriends(friends.map(friend => 

        ? { ...friend, isFollowing: !friend.isFollowing }      friend.id === friendId 

        : friend        ? { ...friend, isFollowing: !friend.isFollowing }

    ));        : friend

  };    ));

  };

  const handleCopyLink = () => {

    Alert.alert('Link Copied', 'Invite link has been copied to clipboard!');  const handleCopyLink = () => {

  };    Alert.alert('Link Copied', 'Invite link has been copied to clipboard!');

  };

  const renderFriend = ({ item }: { item: Friend }) => (

    <View style={styles.friendCard}>  const renderFriend = ({ item }: { item: Friend }) => (

      <Image source={{ uri: item.avatar }} style={styles.avatar} />    <View style={styles.friendCard}>

      <View style={styles.friendInfo}>      <Image source={{ uri: item.avatar }} style={styles.avatar} />

        <Text style={styles.friendName}>{item.name}</Text>      <View style={styles.friendInfo}>

        <Text style={styles.friendUsername}>{item.username}</Text>        <Text style={styles.friendName}>{item.name}</Text>

        <Text style={styles.mutualFriends}>{item.mutualFriends} mutual friends</Text>        <Text style={styles.friendUsername}>{item.username}</Text>

      </View>        <Text style={styles.mutualFriends}>{item.mutualFriends} mutual friends</Text>

      <TouchableOpacity      </View>

        style={[styles.followButton, item.isFollowing && styles.followingButton]}      <TouchableOpacity

        onPress={() => handleFollow(item.id)}        style={[styles.followButton, item.isFollowing && styles.followingButton]}

      >        onPress={() => handleFollow(item.id)}

        <Text style={[styles.followButtonText, item.isFollowing && styles.followingButtonText]}>      >

          {item.isFollowing ? 'Following' : 'Follow'}        <Text style={[styles.followButtonText, item.isFollowing && styles.followingButtonText]}>

        </Text>          {item.isFollowing ? 'Following' : 'Follow'}

      </TouchableOpacity>        </Text>

    </View>      </TouchableOpacity>

  );    </View>

  );

  const renderTabButton = (tab: string, label: string, icon: keyof typeof Ionicons.glyphMap) => (

    <TouchableOpacity  const renderTabButton = (tab: string, label: string, icon: keyof typeof Ionicons.glyphMap) => (

      style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}    <TouchableOpacity

      onPress={() => setActiveTab(tab as any)}      style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}

    >      onPress={() => setActiveTab(tab as any)}

      <Ionicons     >

        name={icon}       <Ionicons 

        size={20}         name={icon} 

        color={activeTab === tab ? '#FFFFFF' : '#6B7280'}         size={20} 

      />        color={activeTab === tab ? '#FFFFFF' : '#6B7280'} 

      <Text style={[styles.tabButtonText, activeTab === tab && styles.activeTabButtonText]}>      />

        {label}      <Text style={[styles.tabButtonText, activeTab === tab && styles.activeTabButtonText]}>

      </Text>        {label}

    </TouchableOpacity>      </Text>

  );    </TouchableOpacity>

  );

  const renderTabContent = () => {

    switch (activeTab) {  const renderTabContent = () => {

      case 'search':    switch (activeTab) {

        return (      case 'search':

          <View style={styles.tabContent}>        return (

            <View style={styles.searchContainer}>          <View style={styles.tabContent}>

              <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />            <View style={styles.searchContainer}>

              <TextInput              <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />

                style={styles.searchInput}              <TextInput

                placeholder="Search for friends..."                style={styles.searchInput}

                value={searchTerm}                placeholder="Search for friends..."

                onChangeText={setSearchTerm}                value={searchTerm}

              />                onChangeText={setSearchTerm}

            </View>              />

            {searchTerm ? (            </View>

              <Text style={styles.noResults}>No results found for "{searchTerm}"</Text>            {searchTerm ? (

            ) : (              <Text style={styles.noResults}>No results found for "{searchTerm}"</Text>

              <Text style={styles.searchPrompt}>Start typing to search for friends</Text>            ) : (

            )}              <Text style={styles.searchPrompt}>Start typing to search for friends</Text>

          </View>            )}

        );          </View>

              );

      case 'invite':      

        return (      case 'invite':

          <View style={styles.tabContent}>        return (

            <View style={styles.inviteSection}>          <View style={styles.tabContent}>

              <Ionicons name="share-outline" size={32} color="#6366F1" style={styles.inviteIcon} />            <View style={styles.inviteSection}>

              <Text style={styles.inviteTitle}>Invite Friends</Text>              <Ionicons name="share-outline" size={32} color="#6366F1" style={styles.inviteIcon} />

              <Text style={styles.inviteDescription}>              <Text style={styles.inviteTitle}>Invite Friends</Text>

                Share your profile link with friends to connect on Kyool              <Text style={styles.inviteDescription}>

              </Text>                Share your profile link with friends to connect on Kyool

              <TouchableOpacity style={styles.copyLinkButton} onPress={handleCopyLink}>              </Text>

                <Ionicons name="copy-outline" size={20} color="#FFFFFF" />              <TouchableOpacity style={styles.copyLinkButton} onPress={handleCopyLink}>

                <Text style={styles.copyLinkText}>Copy Invite Link</Text>                <Ionicons name="copy-outline" size={20} color="#FFFFFF" />

              </TouchableOpacity>                <Text style={styles.copyLinkText}>Copy Invite Link</Text>

            </View>              </TouchableOpacity>

          </View>            </View>

        );          </View>

              );

      default:      

        return (      default:

          <View style={styles.tabContent}>        return (

            <Text style={styles.sectionTitle}>Suggested Friends</Text>          <View style={styles.tabContent}>

            <FlatList            <Text style={styles.sectionTitle}>Suggested Friends</Text>

              data={friends}            <FlatList

              renderItem={renderFriend}              data={friends}

              keyExtractor={(item) => item.id.toString()}              renderItem={renderFriend}

              showsVerticalScrollIndicator={false}              keyExtractor={(item) => item.id.toString()}

            />              showsVerticalScrollIndicator={false}

          </View>            />

        );          </View>

    }        );

  };    }

  };

  return (

    <SafeAreaView style={styles.container}>  return (

      <View style={styles.header}>    <SafeAreaView style={styles.container}>

        <TouchableOpacity style={styles.backButton} onPress={onBack}>      <View style={styles.header}>

          <Ionicons name="arrow-back" size={24} color="#1F2937" />        <TouchableOpacity style={styles.backButton} onPress={onBack}>

        </TouchableOpacity>          <Ionicons name="arrow-back" size={24} color="#1F2937" />

        <Text style={styles.headerTitle}>Add Friends</Text>        </TouchableOpacity>

        <View style={styles.headerRight} />        <Text style={styles.headerTitle}>Add Friends</Text>

      </View>        <View style={styles.headerRight} />

      </View>

      <View style={styles.tabContainer}>

        {renderTabButton('suggested', 'Suggested', 'people-outline')}      <View style={styles.tabContainer}>

        {renderTabButton('search', 'Search', 'search-outline')}        {renderTabButton('suggested', 'Suggested', 'people-outline')}

        {renderTabButton('invite', 'Invite', 'share-outline')}        {renderTabButton('search', 'Search', 'search-outline')}

      </View>        {renderTabButton('invite', 'Invite', 'share-outline')}

      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {renderTabContent()}      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

      </ScrollView>        {renderTabContent()}

    </SafeAreaView>      </ScrollView>

  );    </SafeAreaView>

}  );

}

const styles = StyleSheet.create({

  container: {const styles = StyleSheet.create({

    flex: 1,  container: {

    backgroundColor: '#FFFFFF',    flex: 1,

  },    backgroundColor: '#FFFFFF',

  header: {  },

    flexDirection: 'row',  header: {

    alignItems: 'center',    flexDirection: 'row',

    justifyContent: 'space-between',    alignItems: 'center',

    paddingHorizontal: 16,    justifyContent: 'space-between',

    paddingVertical: 12,    paddingHorizontal: 16,

    borderBottomWidth: 1,    paddingVertical: 12,

    borderBottomColor: '#E5E7EB',    borderBottomWidth: 1,

  },    borderBottomColor: '#E5E7EB',

  backButton: {  },

    padding: 8,  backButton: {

  },    padding: 8,

  headerTitle: {  },

    fontSize: 18,  headerTitle: {

    fontWeight: '600',    fontSize: 18,

    color: '#1F2937',    fontWeight: '600',

  },    color: '#1F2937',

  headerRight: {  },

    width: 40,  headerRight: {

  },    width: 40,

  tabContainer: {  },

    flexDirection: 'row',  tabContainer: {

    paddingHorizontal: 16,    flexDirection: 'row',

    paddingVertical: 12,    paddingHorizontal: 16,

    gap: 8,    paddingVertical: 12,

  },    gap: 8,

  tabButton: {  },

    flex: 1,  tabButton: {

    flexDirection: 'row',    flex: 1,

    alignItems: 'center',    flexDirection: 'row',

    justifyContent: 'center',    alignItems: 'center',

    paddingVertical: 12,    justifyContent: 'center',

    paddingHorizontal: 16,    paddingVertical: 12,

    borderRadius: 8,    paddingHorizontal: 16,

    backgroundColor: '#F3F4F6',    borderRadius: 8,

    gap: 8,    backgroundColor: '#F3F4F6',

  },    gap: 8,

  activeTabButton: {  },

    backgroundColor: '#6366F1',  activeTabButton: {

  },    backgroundColor: '#6366F1',

  tabButtonText: {  },

    fontSize: 14,  tabButtonText: {

    fontWeight: '500',    fontSize: 14,

    color: '#6B7280',    fontWeight: '500',

  },    color: '#6B7280',

  activeTabButtonText: {  },

    color: '#FFFFFF',  activeTabButtonText: {

  },    color: '#FFFFFF',

  content: {  },

    flex: 1,  content: {

  },    flex: 1,

  tabContent: {  },

    padding: 16,  tabContent: {

  },    padding: 16,

  sectionTitle: {  },

    fontSize: 18,  sectionTitle: {

    fontWeight: '600',    fontSize: 18,

    color: '#1F2937',    fontWeight: '600',

    marginBottom: 16,    color: '#1F2937',

  },    marginBottom: 16,

  friendCard: {  },

    flexDirection: 'row',  friendCard: {

    alignItems: 'center',    flexDirection: 'row',

    padding: 16,    alignItems: 'center',

    backgroundColor: '#FFFFFF',    padding: 16,

    borderRadius: 12,    backgroundColor: '#FFFFFF',

    marginBottom: 12,    borderRadius: 12,

    shadowColor: '#000',    marginBottom: 12,

    shadowOffset: { width: 0, height: 2 },    shadowColor: '#000',

    shadowOpacity: 0.1,    shadowOffset: { width: 0, height: 2 },

    shadowRadius: 4,    shadowOpacity: 0.1,

    elevation: 2,    shadowRadius: 4,

  },    elevation: 2,

  avatar: {  },

    width: 50,  avatar: {

    height: 50,    width: 50,

    borderRadius: 25,    height: 50,

    marginRight: 12,    borderRadius: 25,

  },    marginRight: 12,

  friendInfo: {  },

    flex: 1,  friendInfo: {

  },    flex: 1,

  friendName: {  },

    fontSize: 16,  friendName: {

    fontWeight: '600',    fontSize: 16,

    color: '#1F2937',    fontWeight: '600',

    marginBottom: 2,    color: '#1F2937',

  },    marginBottom: 2,

  friendUsername: {  },

    fontSize: 14,  friendUsername: {

    color: '#6B7280',    fontSize: 14,

    marginBottom: 2,    color: '#6B7280',

  },    marginBottom: 2,

  mutualFriends: {  },

    fontSize: 12,  mutualFriends: {

    color: '#9CA3AF',    fontSize: 12,

  },    color: '#9CA3AF',

  followButton: {  },

    paddingHorizontal: 20,  followButton: {

    paddingVertical: 8,    paddingHorizontal: 20,

    borderRadius: 20,    paddingVertical: 8,

    backgroundColor: '#6366F1',    borderRadius: 20,

  },    backgroundColor: '#6366F1',

  followingButton: {  },

    backgroundColor: '#E5E7EB',  followingButton: {

  },    backgroundColor: '#E5E7EB',

  followButtonText: {  },

    fontSize: 14,  followButtonText: {

    fontWeight: '600',    fontSize: 14,

    color: '#FFFFFF',    fontWeight: '600',

  },    color: '#FFFFFF',

  followingButtonText: {  },

    color: '#6B7280',  followingButtonText: {

  },    color: '#6B7280',

  searchContainer: {  },

    flexDirection: 'row',  searchContainer: {

    alignItems: 'center',    flexDirection: 'row',

    backgroundColor: '#F3F4F6',    alignItems: 'center',

    borderRadius: 12,    backgroundColor: '#F3F4F6',

    paddingHorizontal: 16,    borderRadius: 12,

    marginBottom: 16,    paddingHorizontal: 16,

  },    marginBottom: 16,

  searchIcon: {  },

    marginRight: 12,  searchIcon: {

  },    marginRight: 12,

  searchInput: {  },

    flex: 1,  searchInput: {

    paddingVertical: 12,    flex: 1,

    fontSize: 16,    paddingVertical: 12,

    color: '#1F2937',    fontSize: 16,

  },    color: '#1F2937',

  noResults: {  },

    fontSize: 16,  noResults: {

    color: '#6B7280',    fontSize: 16,

    textAlign: 'center',    color: '#6B7280',

    marginTop: 32,    textAlign: 'center',

  },    marginTop: 32,

  searchPrompt: {  },

    fontSize: 16,  searchPrompt: {

    color: '#9CA3AF',    fontSize: 16,

    textAlign: 'center',    color: '#9CA3AF',

    marginTop: 32,    textAlign: 'center',

  },    marginTop: 32,

  inviteSection: {  },

    alignItems: 'center',  inviteSection: {

    paddingVertical: 32,    alignItems: 'center',

  },    paddingVertical: 32,

  inviteIcon: {  },

    marginBottom: 16,  inviteIcon: {

  },    marginBottom: 16,

  inviteTitle: {  },

    fontSize: 20,  inviteTitle: {

    fontWeight: '600',    fontSize: 20,

    color: '#1F2937',    fontWeight: '600',

    marginBottom: 8,    color: '#1F2937',

  },    marginBottom: 8,

  inviteDescription: {  },

    fontSize: 16,  inviteDescription: {

    color: '#6B7280',    fontSize: 16,

    textAlign: 'center',    color: '#6B7280',

    marginBottom: 24,    textAlign: 'center',

    lineHeight: 24,    marginBottom: 24,

  },    lineHeight: 24,

  copyLinkButton: {  },

    flexDirection: 'row',  copyLinkButton: {

    alignItems: 'center',    flexDirection: 'row',

    backgroundColor: '#6366F1',    alignItems: 'center',

    paddingHorizontal: 24,    backgroundColor: '#6366F1',

    paddingVertical: 12,    paddingHorizontal: 24,

    borderRadius: 8,    paddingVertical: 12,

    gap: 8,    borderRadius: 8,

  },    gap: 8,

  copyLinkText: {  },

    fontSize: 16,  copyLinkText: {

    fontWeight: '600',    fontSize: 16,

    color: '#FFFFFF',    fontWeight: '600',

  },    color: '#FFFFFF',

});  },
});
      id: 1,
      name: 'Jennifer Wu',
      username: '@jen_wu',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face',
      mutualFriends: 3,
      reason: 'Similar fitness goals',
      stats: 'Lost 15 lbs in 3 months',
      isAdded: false
    },
    {
      id: 2,
      name: 'Robert Kumar',
      username: '@rob_k',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face',
      mutualFriends: 2,
      reason: 'Same age group (45-50)',
      stats: '12-day healthy streak',
      isAdded: false
    },
    {
      id: 3,
      name: 'Maria Santos',
      username: '@maria_s',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
      mutualFriends: 5,
      reason: 'Similar BMI goals',
      stats: 'Runs 5K daily',
      isAdded: false
    },
    {
      id: 4,
      name: 'James Wilson',
      username: '@james_w',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      mutualFriends: 1,
      reason: 'Loves healthy recipes',
      stats: 'Shared 45+ recipes',
      isAdded: false
    }
  ];

  const [friendsList, setFriendsList] = useState(suggestedFriends);

  const handleAddFriend = (friendId: number) => {
    setFriendsList(prev =>
      prev.map(friend =>
        friend.id === friendId ? { ...friend, isAdded: true } : friend
      )
    );
  };

  const handleCopyLink = async () => {
    const inviteLink = 'https://kyoolapp.com/invite/john-doe-xyz123';
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link');
    }
  };

  const shareOptions = [
    {
      name: 'Text Message',
      icon: MessageSquare,
      color: 'text-green-600',
      description: 'Send invite via SMS'
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'text-blue-600',
      description: 'Send invite via email'
    },
    {
      name: 'WhatsApp',
      icon: Smartphone,
      color: 'text-green-500',
      description: 'Share on WhatsApp'
    },
    {
      name: 'Social Media',
      icon: Share2,
      color: 'text-purple-600',
      description: 'Share on social platforms'
    }
  ];

  return (
    <View>
      {/* Header */}
      <View>
        <TouchableOpacity variant="ghost" size="icon" onPress={onBack}>
          <ArrowLeft />
        </TouchableOpacity>
        <View>
          <h1>Add Friends</h1>
          <Text>
            Connect with others on their health journey
          </Text>
        </View>
      </View>

      <Tabs defaultValue="suggested">
        <TabsList>
          <TabsTrigger value="suggested">Suggested</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="invite">Invite</TabsTrigger>
        </TabsList>

        {/* Suggested Friends */}
        <TabsContent value="suggested">
          <Card>
            <CardHeader>
              <CardTitle>
                <Users />
                Suggested for You
              </CardTitle>
              <Text>
                People with similar health goals and interests
              </Text>
            </CardHeader>
            <CardContent>
              {friendsList.map((friend, index) => (
                <motion.div
                  key={friend.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                 
                >
                  <Avatar>
                    <AvatarImage src={friend.avatar} alt={friend.name} />
                    <AvatarFallback>{friend.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <View>
                    <View>
                      <h3>{friend.name}</h3>
                      <Text>{friend.username}</Text>
                    </View>
                    
                    <View>
                      <Badge variant="secondary">
                        {friend.reason}
                      </Badge>
                      {friend.mutualFriends > 0 && (
                        <Text>
                          {friend.mutualFriends} mutual friends
                        </Text>
                      )}
                    </View>
                    
                    <View>
                      <TrendingUp />
                      <Text>{friend.stats}</Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity
                    size="sm"
                    variant={friend.isAdded ? "outline" : "default"}
                    onPress={() => handleAddFriend(friend.id)}
                    disabled={friend.isAdded}
                   
                  >
                    {friend.isAdded ? (
                      <>
                        <CheckCircle />
                        Added
                      </>
                    ) : (
                      <>
                        <UserPlus />
                        Add
                      </>
                    )}
                  </TouchableOpacity>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Search Friends */}
        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>
                <Search />
                Search Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <View>
                <Search />
                <TextInput
                  placeholder="Search by username, email, or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                 
                />
              </View>
              
              {searchTerm ? (
                <View>
                  <Search />
                  <h3>Searching for "{searchTerm}"</h3>
                  <Text>
                    Results will appear here when you search
                  </Text>
                </View>
              ) : (
                <View>
                  <Search />
                  <h3>Find Friends</h3>
                  <Text>
                    Enter a username, email, or name to search for friends
                  </Text>
                </View>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invite Friends */}
        <TabsContent value="invite">
          {/* Share Link */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Share2 />
                Your Invite Link
              </CardTitle>
              <Text>
                Share this link with friends to invite them to KyoolApp
              </Text>
            </CardHeader>
            <CardContent>
              <View>
                <TextInput
                  value="https://kyoolapp.com/invite/john-doe-xyz123"
                  readOnly
                 
                />
                <TouchableOpacity
                  variant="outline"
                  onPress={handleCopyLink}
                 
                >
                  {copiedLink ? (
                    <>
                      <CheckCircle />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy />
                      Copy
                    </>
                  )}
                </TouchableOpacity>
              </View>
              
              <View>
                {shareOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <TouchableOpacity
                      key={index}
                      variant="outline"
                     
                    >
                      <Icon`} />
                      <View>
                        <View>{option.name}</View>
                        <View>{option.description}</View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </CardContent>
          </Card>

          {/* QR Code */}
          <Card>
            <CardHeader>
              <CardTitle>
                <QrCode />
                QR Code
              </CardTitle>
              <Text>
                Let friends scan this code to add you instantly
              </Text>
            </CardHeader>
            <CardContent>
              <View>
                <View>
                  <QrCode />
                </View>
                <Text>
                  Show this QR code to friends nearby or save it to share later
                </Text>
                <TouchableOpacity variant="outline">
                  <Eye />
                  View Full Screen
                </TouchableOpacity>
              </View>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>💡 Pro Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <View>
                <View>
                  <Text>1</Text>
                </View>
                <View>
                  <Text>Share your goals</Text>
                  <Text>Friends with similar health goals are more likely to stay motivated together</Text>
                </View>
              </View>
              <View>
                <View>
                  <Text>2</Text>
                </View>
                <View>
                  <Text>Join challenges</Text>
                  <Text>Participate in group challenges to meet like-minded people</Text>
                </View>
              </View>
              <View>
                <View>
                  <Text>3</Text>
                </View>
                <View>
                  <Text>Be encouraging</Text>
                  <Text>Support others' achievements to build a positive community</Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </View>
  );
}