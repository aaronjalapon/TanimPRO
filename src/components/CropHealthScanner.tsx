import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Camera, Upload, AlertTriangle, CheckCircle, Lightbulb, MessageSquare, History } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CropHealthScanner({ user }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [scanHistory, setScanHistory] = useState([
    {
      id: 1,
      date: '2025-01-27',
      crop: 'Rice',
      result: 'Brown Spot Disease',
      severity: 'Medium',
      confidence: 87
    },
    {
      id: 2,
      date: '2025-01-25',
      crop: 'Tomato',
      result: 'Healthy',
      severity: null,
      confidence: 95
    }
  ]);
  
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const mockResults = [
        {
          condition: 'Bacterial Leaf Blight',
          severity: 'Medium',
          confidence: 78,
          description: 'A common bacterial disease affecting rice plants, causing water-soaked lesions on leaves.',
          treatment: [
            'Remove and destroy infected plant debris',
            'Apply copper-based bactericide spray',
            'Improve field drainage to reduce humidity',
            'Use resistant varieties for next planting season'
          ],
          prevention: [
            'Avoid overhead irrigation during flowering',
            'Maintain proper plant spacing for air circulation',
            'Apply balanced fertilization - avoid excess nitrogen'
          ],
          urgency: 'moderate'
        },
        {
          condition: 'Healthy Plant',
          severity: null,
          confidence: 92,
          description: 'Your crop appears healthy with no visible signs of disease or pest damage.',
          treatment: [
            'Continue current care practices',
            'Monitor regularly for early detection',
            'Maintain consistent watering schedule'
          ],
          prevention: [
            'Regular inspection every 3-4 days',
            'Proper fertilization schedule',
            'Good field hygiene practices'
          ],
          urgency: 'low'
        }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(randomResult);
      setIsAnalyzing(false);
      
      // Add to history
      const newScan = {
        id: scanHistory.length + 1,
        date: new Date().toISOString().split('T')[0],
        crop: user?.primaryCrop || 'Rice',
        result: randomResult.condition,
        severity: randomResult.severity,
        confidence: randomResult.confidence
      };
      setScanHistory([newScan, ...scanHistory]);
    }, 3000);
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'low':
      case 'mild': return 'bg-green-100 text-green-800';
      case 'medium':
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'high':
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'high': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'moderate': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <h2>Crop Health Scanner</h2>
      <p className="text-sm text-muted-foreground">
        Take a photo of your crop to get instant AI-powered health diagnosis
      </p>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Scan Your Crop
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!selectedImage ? (
            <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
              <Camera className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-sm text-muted-foreground mb-4">
                Take a clear photo of the affected plant part (leaves, stem, fruit)
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
                <Button variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <ImageWithFallback 
                  src={selectedImage} 
                  alt="Crop scan" 
                  className="max-w-sm mx-auto rounded-lg border"
                />
              </div>
              <div className="flex gap-2 justify-center">
                <Button 
                  onClick={simulateAnalysis} 
                  disabled={isAnalyzing}
                  className="flex-1 max-w-xs"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Plant'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedImage(null);
                    setAnalysisResult(null);
                  }}
                >
                  Retake
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-sm">AI is analyzing your crop...</p>
              <div className="text-xs text-muted-foreground mt-2">
                Checking for diseases, pests, and nutrient deficiencies
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getUrgencyIcon(analysisResult.urgency)}
                  Diagnosis Result
                </div>
                <Badge variant="outline">
                  {analysisResult.confidence}% confidence
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg">{analysisResult.condition}</h3>
                    {analysisResult.severity && (
                      <Badge className={getSeverityColor(analysisResult.severity)}>
                        {analysisResult.severity} Severity
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {analysisResult.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Treatment Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Recommended Treatment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {analysisResult.treatment.map((step, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prevention Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Prevention Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {analysisResult.prevention.map((tip, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Ask Community
            </Button>
            <Button className="flex items-center gap-2">
              <History className="w-4 h-4" />
              Save to Records
            </Button>
          </div>
        </div>
      )}

      {/* Scan History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Recent Scans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scanHistory.map((scan) => (
              <div key={scan.id} className="flex items-center justify-between p-3 bg-muted rounded">
                <div>
                  <div className="text-sm">{scan.result}</div>
                  <div className="text-xs text-muted-foreground">
                    {scan.crop} • {scan.date} • {scan.confidence}% confidence
                  </div>
                </div>
                {scan.severity && (
                  <Badge className={getSeverityColor(scan.severity)}>
                    {scan.severity}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Photography Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="mb-2">For Best Results:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Take photos in good lighting</li>
                <li>• Focus on affected areas</li>
                <li>• Include some healthy parts for comparison</li>
                <li>• Avoid blurry or dark images</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2">What to Capture:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Close-up of symptoms</li>
                <li>• Overall plant condition</li>
                <li>• Both sides of leaves</li>
                <li>• Multiple affected areas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}