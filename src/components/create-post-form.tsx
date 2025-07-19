"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Loader2, Send, X } from "lucide-react";
import Image from "next/image";
import { generateImageTags } from "@/ai/flows/generate-image-tags";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface CreatePostFormProps {
  userAvatar?: string;
}

export function CreatePostForm({ userAvatar }: CreatePostFormProps) {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [isTagging, setIsTagging] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadstart = () => {
        setIsTagging(true);
        setTags([]);
      };
      reader.onloadend = async () => {
        const dataUri = reader.result as string;
        setImagePreview(dataUri);
        try {
          const result = await generateImageTags({ photoDataUri: dataUri });
          setTags(result.tags);
        } catch (error) {
          console.error("Failed to generate tags:", error);
          toast({
            variant: "destructive",
            title: "AI Tagging Failed",
            description: "Could not generate tags for the image.",
          });
        } finally {
          setIsTagging(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostSubmit = async () => {
    if (!content && !imagePreview) return;
    setIsPosting(true);
    // Simulate API call
    console.log("Posting:", { content, image: imagePreview, tags });
    await new Promise(res => setTimeout(res, 1500));
    
    // Reset form
    setContent("");
    setImagePreview(null);
    setTags([]);
    if(fileInputRef.current) fileInputRef.current.value = "";
    
    setIsPosting(false);
    toast({
        title: "Post Created!",
        description: "Your post is now live.",
    });
  };
  
  const removeImage = () => {
      setImagePreview(null);
      setTags([]);
      if (fileInputRef.current) {
          fileInputRef.current.value = "";
      }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={userAvatar} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's happening?"
              className="w-full border-none focus-visible:ring-0 shadow-none p-0 resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={2}
            />

            {imagePreview && (
              <div className="mt-4 relative">
                <Image
                  src={imagePreview}
                  alt="Image preview"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover max-h-80 w-auto"
                  data-ai-hint="post image"
                />
                <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={removeImage}>
                    <X className="h-4 w-4"/>
                </Button>
                
                {(isTagging || tags.length > 0) && (
                    <div className="mt-2 flex flex-wrap gap-2 items-center">
                        {isTagging && <Loader2 className="h-4 w-4 animate-spin" />}
                        {tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                )}
              </div>
            )}

            <div className="mt-4 flex justify-between items-center">
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isTagging}
                >
                  <ImageIcon className="h-5 w-5 text-primary" />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
              <Button onClick={handlePostSubmit} disabled={(!content && !imagePreview) || isPosting || isTagging}>
                {isPosting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
