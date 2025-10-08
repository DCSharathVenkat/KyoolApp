// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft,
  Search, 
  UserPlus, 
  Users,
  Share2,
  Copy,
  QrCode,
  Mail,
  MessageSquare,
  Smartphone,
  Globe,
  CheckCircle,
  Plus,
  Eye,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';

interface AddFriendsProps {
  onBack: () => void;
}

export function AddFriends({ onBack }: AddFriendsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Mock suggested friends data
  const suggestedFriends = [
    {
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