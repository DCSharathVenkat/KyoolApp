// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { Button } from "./ui/button";
import { Shield, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { signOut } from "firebase/auth";
import { createOrUpdateUser } from "../api/user_api"; // adjust path if needed
import { getUserByEmail } from "../api/user_api"; // create this function
import { useNavigate } // TODO: react-router-dom import removed - convert to React Navigation or platform-specific routing

// NOTE: Functionality preserved exactly: same named export, same popup flow, same states
export function LoginPage() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      setSubmitting(true);
      setError("");
      const result = await signInWithPopup(auth, googleProvider);
      // Check if user exists in DB
      const googleUser = result.user;
      const email = googleUser.email;
      const user = await getUserByEmail(email);
      if (!user || user.detail === "User not found") {
        // Redirect to signup, passing Google user info
        navigate("/signup", {
          state: {
            googleUser: {
              uid: googleUser.uid,
              displayName: googleUser.displayName,
              email: googleUser.email,
              photoURL: googleUser.photoURL,
            },
          },
        });
        return;
      }
      //console.log("signInWithPopup result:", result);
      
      

    //const userId = googleUser.uid;

      //const userData = {
      //username: "your_username", // or prompt user for this
      //name: googleUser.displayName,
      //email: googleUser.email,
  // ...other fields you want to send
      //};
      //await createOrUpdateUser(userId, userData);
      //onLogin(googleUser);


      // No onLogin calls — App.tsx can listen to auth state
    } catch (err: any) {
      console.error(err);
      if (err?.code === "auth/popup-closed-by-user") {
        setError("Popup was closed before completing sign in.");
      } else if (err?.code === "auth/cancelled-popup-request") {
        setError("Another sign-in is already in progress. Try again.");
      } else if (err?.code === "auth/network-request-failed") {
        setError("Network error. Check your connection and try again.");
      } else {
        setError("Google sign-in failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View>
    
      {/* Ambient orbs */}
      <View />
      <View />

      <View>
        <View>
          <View>
            {/* Logo / Title */}
            <View>
              <View>
                <Sparkles />
              </View>
              <View>
                <h1>Kyool</h1>
                <Text>Personalized meals & fitness, simplified</Text>
              </View>
            </View>

            {/* Heading */}
            <h2>Sign in to Kyool</h2>
            <Text>Continue with Google to sync your preferences across devices.</Text>

            {/* Benefits */}
            <ul>
              <li><CheckCircle2 /> Save recipes & meal plans</li>
              <li><CheckCircle2 /> Track workouts & progress</li>
              <li><CheckCircle2 /> Smart recommendations</li>
            </ul>

            {/* Google Button (unchanged flow) */}
            <View>
<TouchableOpacity
  onPress={handleGoogleLogin}
  disabled={submitting}
 
>
  {submitting ? (
    <Loader2 />
  ) : (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.9 16.6 19.1 14 24 14c3 0 5.7 1.1 7.8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.5 26.7 36 24 36c-5.3 0-10-3.3-11.8-8l-6.6 5.1C8.9 39.7 15.9 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.8-4.9 6.5-9.3 6.5-5.3 0-10-3.3-11.8-8l-6.6 5.1C8.9 39.7 15.9 44 24 44c8.1 0 15.3-5.3 17.9-12.5 0-1.2.1-2.3.1-3.5 0-1.2-.1-2.3-.4-3.5z"/>
    </svg>
  )}
  <Text>{submitting ? "Signing in…" : "Sign in with Google"}</Text>
</TouchableOpacity>

            </View>

            {/* Error message */}
            {error && (
              <View role="alert" aria-live="polite">
                {error}
              </View>
            )}

            {/* Footer */}
            <View>
              <View>
                <Text /* anchor converted - add onPress */ href="#">Privacy</Text>
                <Text /* anchor converted - add onPress */ href="#">Terms</Text>
              </View>
            </View>
          </View>

          <Text>
            By continuing, you agree to our Terms of Service and acknowledge our Privacy Policy.
          </Text>
        </View>
      </View>
    </View>
  );
}