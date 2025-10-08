// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { searchUsers } from '../api/user_api';

export default function UserSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  interface User {
    id: string;
    username: string;
    name?: string;
    avatar?: string;
  }

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setError('');
      return;
    }
    setLoading(true);
    setError('');
    searchUsers(query)
      .then(users => setResults(users))
      .catch(() => setError('Error searching users'))
      .finally(() => setLoading(false));
  }, [query]);

  if (selectedUser) {
    // Simple profile view (expand as needed)
    return (
      <View>
        <TouchableOpacity onPress={() => setSelectedUser(null)}>Back to Search</TouchableOpacity>
        <View>
          <Avatar>
            <AvatarImage src={selectedUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.name || selectedUser.username)}`} />
            <AvatarFallback>{(selectedUser.name || selectedUser.username || '').slice(0,2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <View>{selectedUser.username}</View>
          <View>{selectedUser.name}</View>
          <Avatar>
                <AvatarImage 
                    src={selectedUser.avatar}
                    onError={() => {
                    console.warn('Avatar image failed to load:', selectedUser.avatar);
                    }}
                />
                <AvatarFallback>
                    {(selectedUser.name ?? '').split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
            </Avatar>
          {/* Add more profile info here if available */}
        </View>
      </View>
    );
  }

  return (
    <View>
      <h2>Search Users</h2>
      <TextInput
        type="text"
        placeholder="Search by username or name"
        value={query}
        onChange={e => setQuery(e.target.value)}
       
      />
      {loading && <View>Searching...</View>}
      {error && <View>{error}</View>}
      {!loading && !error && results.length === 0 && query && (
        <View>No users found.</View>
      )}
      <ul>
        {results.map(user => (
          <li key={user.id} onPress={() => setSelectedUser(user)}>
            <Avatar>
              <AvatarImage src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.username)}`} />
              <AvatarFallback>{(user.name || user.username || '').slice(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <View>
              <View>{user.username}</View>
              <View>{user.name}</View>
            </View>
          </li>
        ))}
      </ul>
    </View>
  );
}
