import { createClient } from '@/utils/supabase/client';
import { v4 as uuidv4 } from 'uuid';

/**
 * Uploads an image to Supabase storage
 * @param file The file to upload
 * @param bucket The storage bucket name
 * @param folder The folder within the bucket
 * @returns The URL of the uploaded file
 */
export async function uploadImage(
  file: File,
  bucket: string = 'blog-images',
  folder: string = 'posts'
): Promise<string> {
  const supabase = createClient();
  
  // Generate a unique filename to avoid collisions
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${uuidv4()}.${fileExt}`;
  
  // Upload the file
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) {
    console.error('Error uploading image:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
  
  // Construct the public URL
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);
  
  return urlData.publicUrl;
}

/**
 * Deletes an image from Supabase storage
 * @param url The public URL of the image to delete
 * @param bucket The storage bucket name
 */
export async function deleteImage(url: string, bucket: string = 'blog-images'): Promise<void> {
  const supabase = createClient();
  
  // Extract the path from the URL
  const urlObj = new URL(url);
  const pathMatch = urlObj.pathname.match(new RegExp(`/${bucket}/object/public/(.+)$`));
  
  if (!pathMatch || !pathMatch[1]) {
    console.error('Invalid image URL format');
    throw new Error('Invalid image URL format');
  }
  
  const path = decodeURIComponent(pathMatch[1]);
  
  // Delete the file
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);
  
  if (error) {
    console.error('Error deleting image:', error);
    throw new Error(`Failed to delete image: ${error.message}`);
  }
} 