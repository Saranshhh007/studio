'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, Send, Loader2, PartyPopper, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { categorizeComplaint, CategorizeComplaintOutput } from '@/ai/flows/categorize-complaint';

export default function NewComplaintPage() {
  const [description, setDescription] = useState('');
  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [aiResult, setAiResult] = useState<CategorizeComplaintOutput | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Not Supported',
          description: 'Your browser does not support camera access.',
        });
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();
    
    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);

  const takePicture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUri = canvas.toDataURL('image/jpeg');
        setPhotoDataUri(dataUri);
      }
    }
  }, []);

  const handleSubmit = async () => {
    if (!photoDataUri) {
      toast({ variant: 'destructive', title: 'No Photo', description: 'Please take a picture of the issue.' });
      return;
    }
    if (!description.trim()) {
      toast({ variant: 'destructive', title: 'No Description', description: 'Please describe the issue.' });
      return;
    }

    setIsLoading(true);
    setAiResult(null);

    try {
      const result = await categorizeComplaint({ photoDataUri, description });
      setAiResult(result);
      toast({ title: 'Categorization Complete', description: 'AI has analyzed your complaint.' });
    } catch (error) {
      console.error('Error categorizing complaint:', error);
      toast({ variant: 'destructive', title: 'AI Analysis Failed', description: 'Could not categorize the complaint. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const priorityColorMap: Record<string, string> = {
    low: 'bg-gray-500',
    medium: 'bg-yellow-500',
    high: 'bg-orange-500',
    critical: 'bg-red-600',
  };


  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-deep-blue">File a New Complaint</h1>
        <p className="text-muted-foreground">
          Use your camera to report a civic issue. Our AI will handle the rest.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Document the Issue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="relative aspect-video bg-muted rounded-md overflow-hidden border">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                {photoDataUri && <img src={photoDataUri} alt="Captured complaint" className="absolute inset-0 w-full h-full object-cover z-10"/>}
                {hasCameraPermission === false && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-20">
                         <Camera className="w-12 h-12 text-white/50 mb-4" />
                        <p className="text-white font-semibold">Camera Access Required</p>
                        <p className="text-white/80 text-sm text-center px-4">Please allow camera access in your browser.</p>
                    </div>
                )}
             </div>
             
             {photoDataUri ? (
                 <Button onClick={() => setPhotoDataUri(null)} variant="outline" className="w-full">
                    Retake Picture
                </Button>
             ) : (
                <Button onClick={takePicture} disabled={hasCameraPermission !== true} className="w-full">
                    <Camera className="mr-2 h-4 w-4" />
                    Take Picture
                </Button>
             )}

            <Textarea
              placeholder="Describe the issue in a few words... e.g., 'Overflowing garbage bin on main street corner.'"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />

            <Button onClick={handleSubmit} disabled={isLoading || !photoDataUri || !description} className="w-full bg-brand-green hover:bg-brand-green/90 text-white">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit for AI Categorization
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className={`sticky top-28 ${!aiResult && !isLoading ? 'hidden md:block' : ''}`}>
          <CardHeader>
            <CardTitle>Step 2: AI Analysis Result</CardTitle>
            <CardDescription>Our AI has processed your complaint.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p className="font-medium">AI is analyzing the issue...</p>
                <p className="text-sm">This may take a moment.</p>
              </div>
            )}
            {!isLoading && !aiResult && (
                <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                    <PartyPopper className="h-12 w-12 text-primary/50 mb-4" />
                    <p className="font-medium">Your results will appear here</p>
                    <p className="text-sm">Submit an issue on the left to get started.</p>
                </div>
            )}
            {aiResult && (
              <div className="space-y-4">
                <Alert variant="default" className="border-green-500/50 bg-green-500/10 text-green-700">
                    <CheckCircle className="h-4 w-4 !text-green-600"/>
                    <AlertTitle className="text-green-800">Analysis Complete!</AlertTitle>
                    <AlertDescription className="text-green-700">
                        Your complaint is ready to be filed.
                    </AlertDescription>
                </Alert>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Suggested Title</label>
                  <p className="font-semibold text-lg">{aiResult.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Assigned Department</label>
                  <p className="font-semibold">{aiResult.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Category</label>
                  <p className="font-semibold">{aiResult.category}</p>
                </div>
                 <div>
                  <label className="text-sm font-medium text-muted-foreground">Priority</label>
                  <p><Badge className={`${priorityColorMap[aiResult.priority]} text-white capitalize`}>{aiResult.priority}</Badge></p>
                </div>
                <div className="pt-2">
                    <p className="text-xs text-muted-foreground italic">AI Reasoning: {aiResult.reasoning}</p>
                </div>

                <Button className="w-full">Confirm & File Complaint</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
}
