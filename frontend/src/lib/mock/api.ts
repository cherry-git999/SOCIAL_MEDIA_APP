// Mock API implementation replacing Appwrite
import { IUpdatePost, INewPost, INewUser, IUpdateUser } from "@/types";
import { MOCK_USER, MOCK_USERS, MOCK_POSTS, MOCK_SAVES } from "./mockData";

// Local storage for mock data
let mockPosts = [...MOCK_POSTS];
let mockUsers = [...MOCK_USERS];
let mockSaves = [...MOCK_SAVES];

// Helper to simulate async operations
const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// ============================================================
// AUTH
// ============================================================

export async function createUserAccount(user: INewUser) {
  await delay();
  console.log("Mock: Creating user account for:", user.email);
  
  const newUser = {
    $id: `user-${Date.now()}`,
    accountId: `user-${Date.now()}`,
    name: user.name,
    username: user.username,
    email: user.email,
    imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=877EFF&color=fff`,
    bio: "",
  };
  
  mockUsers.push(newUser);
  localStorage.setItem("cookieFallback", JSON.stringify([{ name: "session", value: "active" }]));
  
  return newUser;
}

export async function signInAccount(user: { email: string; password: string }) {
  await delay();
  console.log("Mock: Signing in user:", user.email);
  
  // Mock session - always successful
  localStorage.setItem("cookieFallback", JSON.stringify([{ name: "session", value: "active" }]));
  
  return { $id: "session-123", userId: MOCK_USER.$id };
}

export async function getAccount() {
  await delay();
  const cookieFallback = localStorage.getItem("cookieFallback");
  
  if (cookieFallback && cookieFallback !== "[]") {
    return { $id: MOCK_USER.accountId, name: MOCK_USER.name, email: MOCK_USER.email };
  }
  
  return null;
}

export async function getCurrentUser() {
  await delay();
  const account = await getAccount();
  
  if (!account) return null;
  
  return MOCK_USER;
}

export async function signOutAccount() {
  await delay();
  console.log("Mock: Signing out user");
  localStorage.removeItem("cookieFallback");
  return { status: "success" };
}

// ============================================================
// POSTS
// ============================================================

export async function createPost(post: INewPost) {
  await delay();
  console.log("Mock: Creating post");
  
  const tags = post.tags?.replace(/ /g, "").split(",").filter(Boolean) || [];
  
  const newPost = {
    $id: `post-${Date.now()}`,
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    caption: post.caption,
    imageUrl: post.file[0] ? URL.createObjectURL(post.file[0]) : "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800",
    imageId: `img-${Date.now()}`,
    location: post.location || "",
    tags,
    likes: [],
    creator: MOCK_USER,
  };
  
  mockPosts.unshift(newPost);
  return newPost;
}

export async function uploadFile(file: File) {
  await delay();
  return { $id: `file-${Date.now()}`, name: file.name };
}

export function getFilePreview(_fileId: string) {
  // Return a placeholder or mock URL
  return `https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800`;
}

export async function deleteFile(_fileId: string) {
  await delay();
  return { status: "ok" };
}

export async function searchPosts(searchTerm: string) {
  await delay();
  
  const filtered = mockPosts.filter(
    (post) =>
      post.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return { documents: filtered, total: filtered.length };
}

export async function getInfinitePosts({ pageParam }: { pageParam?: number }) {
  await delay();
  
  const limit = 9;
  const start = pageParam || 0;
  const paginatedPosts = mockPosts.slice(start, start + limit);
  
  return {
    documents: paginatedPosts,
    total: mockPosts.length,
  };
}

export async function getPostById(postId?: string) {
  await delay();
  
  if (!postId) throw new Error("Post ID is required");
  
  const post = mockPosts.find((p) => p.$id === postId);
  
  if (!post) throw new Error("Post not found");
  
  return post;
}

export async function updatePost(post: IUpdatePost) {
  await delay();
  console.log("Mock: Updating post");
  
  const index = mockPosts.findIndex((p) => p.$id === post.postId);
  
  if (index === -1) throw new Error("Post not found");
  
  const tags = post.tags?.replace(/ /g, "").split(",").filter(Boolean) || [];
  
  const updatedPost = {
    ...mockPosts[index],
    caption: post.caption,
    location: post.location || "",
    tags,
    $updatedAt: new Date().toISOString(),
  };
  
  if (post.file.length > 0) {
    updatedPost.imageUrl = URL.createObjectURL(post.file[0]);
    updatedPost.imageId = `img-${Date.now()}`;
  }
  
  mockPosts[index] = updatedPost;
  return updatedPost;
}

export async function deletePost(postId?: string, _imageId?: string) {
  await delay();
  
  if (!postId) return;
  
  mockPosts = mockPosts.filter((p) => p.$id !== postId);
  return { status: "Ok" };
}

export async function likePost(postId: string, likesArray: string[]) {
  await delay();
  
  const post = mockPosts.find((p) => p.$id === postId);
  
  if (!post) throw new Error("Post not found");
  
  post.likes = likesArray;
  return post;
}

export async function savePost(userId: string, postId: string) {
  await delay();
  
  const newSave = {
    $id: `save-${Date.now()}`,
    user: userId,
    post: postId,
  };
  
  mockSaves.push(newSave);
  return newSave;
}

export async function deleteSavedPost(savedRecordId: string) {
  await delay();
  
  mockSaves = mockSaves.filter((s) => s.$id !== savedRecordId);
  return { status: "Ok" };
}

export async function getUserPosts(userId?: string) {
  await delay();
  
  if (!userId) return;
  
  const userPosts = mockPosts.filter((post) => post.creator.$id === userId);
  
  return { documents: userPosts, total: userPosts.length };
}

export async function getRecentPosts() {
  await delay();
  
  const recentPosts = [...mockPosts].slice(0, 20);
  
  return { documents: recentPosts, total: recentPosts.length };
}

// ============================================================
// USER
// ============================================================

export async function getUsers(limit?: number) {
  await delay();
  
  const users = limit ? mockUsers.slice(0, limit) : mockUsers;
  
  return { documents: users, total: users.length };
}

export async function getUserById(userId: string) {
  await delay();
  
  const user = mockUsers.find((u) => u.$id === userId);
  
  if (!user) throw new Error("User not found");
  
  return user;
}

export async function updateUser(user: IUpdateUser) {
  await delay();
  console.log("Mock: Updating user");
  
  const index = mockUsers.findIndex((u) => u.$id === user.userId);
  
  if (index === -1) {
    // If user not found, update MOCK_USER (current user)
    if (user.userId === MOCK_USER.$id) {
      MOCK_USER.name = user.name;
      MOCK_USER.bio = user.bio;
      
      if (user.file.length > 0) {
        MOCK_USER.imageUrl = URL.createObjectURL(user.file[0]);
      }
      
      return MOCK_USER;
    }
    throw new Error("User not found");
  }
  
  const updatedUser = {
    ...mockUsers[index],
    name: user.name,
    bio: user.bio,
  };
  
  if (user.file.length > 0) {
    updatedUser.imageUrl = URL.createObjectURL(user.file[0]);
  }
  
  mockUsers[index] = updatedUser;
  return updatedUser;
}
