
import { BlogPost, useBlogStore } from "@/data/posts";
import { toast } from "sonner";

// Constants for command types
export const BLOG_COMMANDS = {
  SEND: "send",
  SAVE: "save",
  UPDATE: "update",
  DELETE: "delete"
};

// Type for blog commands
export type BlogCommand = typeof BLOG_COMMANDS[keyof typeof BLOG_COMMANDS];

// Validates if a string is a valid blog command
export function isValidCommand(value: string | undefined): value is BlogCommand {
  if (!value) return false;
  const normalizedValue = value.trim().toLowerCase();
  return Object.values(BLOG_COMMANDS).includes(normalizedValue as BlogCommand);
}

// Extracts command from featuredSize field
export function extractCommand(post: BlogPost): BlogCommand | null {
  if (!post.featuredSize) return null;
  
  const potentialCommand = post.featuredSize.trim().toLowerCase();
  return isValidCommand(potentialCommand) ? potentialCommand as BlogCommand : null;
}

// Process a single post based on its command
export async function processPostCommand(post: BlogPost): Promise<boolean> {
  const command = extractCommand(post);
  if (!command) return false;
  
  console.log(`Processing command '${command}' for post: ${post.title} (ID: ${post.id})`);
  
  try {
    switch(command) {
      case BLOG_COMMANDS.SEND:
      case BLOG_COMMANDS.SAVE:
        await handleSavePost(post);
        break;
      case BLOG_COMMANDS.UPDATE:
        await handleUpdatePost(post);
        break;
      case BLOG_COMMANDS.DELETE:
        await handleDeletePost(post);
        break;
      default:
        return false;
    }
    return true;
  } catch (error) {
    console.error(`Error processing command '${command}' for post:`, post.id, error);
    return false;
  }
}

// Handler for save/send commands
async function handleSavePost(post: BlogPost): Promise<void> {
  // In a real implementation, this would generate the post
  // For now, we'll just add the post to our store if it doesn't exist
  const store = useBlogStore.getState();
  const existingPost = store.blogPosts.find(p => p.id === post.id);
  
  if (!existingPost) {
    // This is a new post
    toast.success(`Post "${post.title}" has been published`);
    console.log(`New post saved: ${post.title} (ID: ${post.id})`);
    
    // Clear the command after processing
    post.featuredSize = undefined;
    
    // We're not actually mutating the store here as that will happen
    // automatically when the Google Sheet is fetched
  } else {
    toast.info(`Post "${post.title}" already exists`);
  }
}

// Handler for update commands
async function handleUpdatePost(post: BlogPost): Promise<void> {
  const store = useBlogStore.getState();
  const existingPost = store.blogPosts.find(p => p.id === post.id);
  
  if (existingPost) {
    toast.success(`Post "${post.title}" has been updated`);
    console.log(`Post updated: ${post.title} (ID: ${post.id})`);
    
    // Clear the command after processing
    post.featuredSize = undefined;
    
    // The actual update will happen when the Google Sheet is fetched
  } else {
    toast.error(`Cannot update: Post "${post.title}" not found`);
  }
}

// Handler for delete commands
async function handleDeletePost(post: BlogPost): Promise<void> {
  const store = useBlogStore.getState();
  const existingPostIndex = store.blogPosts.findIndex(p => p.id === post.id);
  
  if (existingPostIndex !== -1) {
    toast.success(`Post "${post.title}" has been deleted`);
    console.log(`Post deleted: ${post.title} (ID: ${post.id})`);
    
    // For now, we'll rely on the next Google Sheet fetch to remove the post
    // But we could implement a more immediate removal if needed
  } else {
    toast.error(`Cannot delete: Post "${post.title}" not found`);
  }
}

// Batch process all posts with commands
export async function processAllPostCommands(posts: BlogPost[]): Promise<number> {
  let processedCount = 0;
  
  for (const post of posts) {
    const command = extractCommand(post);
    if (command) {
      const success = await processPostCommand(post);
      if (success) {
        processedCount++;
      }
    }
  }
  
  return processedCount;
}
