import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import { ArrowLeft, Camera, Upload, Microscope, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CropDiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const diseaseHistory = [
    {
      date: '2024-12-10',
      crop: 'Rice Paddy - Block A',
      disease: 'Leaf Blast',
      severity: 'Medium',
      treatment: 'Applied fungicide spray',
      status: 'Treated'
    },
    {
      date: '2024-12-08',
      crop: 'Coconut Palm #15',
      disease: 'Bud Rot',
      severity: 'High',
      treatment: 'Removed affected parts',
      status: 'Under Treatment'
    },
    {
      date: '2024-12-05',
      crop: 'Pepper Vine - Section B',
      disease: 'Black Pepper Disease',
      severity: 'Low',
      treatment: 'Copper-based spray',
      status: 'Recovered'
    }
  ];

  const commonDiseases = [
    {
      name: 'Rice Blast',
      crops: ['Rice'],
      symptoms: 'Brown spots with yellow halos on leaves',
      prevention: 'Proper spacing, avoid excess nitrogen'
    },
    {
      name: 'Coconut Bud Rot',
      crops: ['Coconut'],
      symptoms: 'Rotting of unopened leaves, foul smell',
      prevention: 'Good drainage, avoid waterlogging'
    },
    {
      name: 'Pepper Wilt',
      crops: ['Black Pepper'],
      symptoms: 'Yellowing and wilting of leaves',
      prevention: 'Disease-free planting material'
    },
    {
      name: 'Bacterial Wilt',
      crops: ['Vegetables'],
      symptoms: 'Sudden wilting despite adequate moisture',
      prevention: 'Crop rotation, soil solarization'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Crop Disease Detection
          </h1>
          <p className="text-xl text-muted-foreground">
            Identify crop diseases early with AI-powered image recognition
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Disease Scanner */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Microscope className="h-6 w-6 mr-2 text-primary" />
              AI Disease Scanner
            </h3>
            
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-6">
              {selectedImage ? (
                <div>
                  <img 
                    src={selectedImage} 
                    alt="Uploaded crop" 
                    className="max-w-full h-40 mx-auto object-cover rounded mb-4"
                  />
                  <p className="text-sm text-muted-foreground">Image uploaded successfully</p>
                </div>
              ) : (
                <div>
                  <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">Upload or Capture Plant Image</p>
                  <p className="text-sm text-muted-foreground">
                    Take a clear photo of the affected plant part for AI analysis
                  </p>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button className="h-12">
                <Camera className="h-5 w-5 mr-2" />
                Take Photo
              </Button>
              <Button variant="outline" className="h-12">
                <Upload className="h-5 w-5 mr-2" />
                Upload Image
              </Button>
            </div>
            
            <Button className="w-full bg-primary hover:bg-primary-dark text-white h-12">
              Analyze for Diseases
            </Button>
            
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Tips for better results:</strong>
                <br />• Take photos in good lighting
                <br />• Focus on affected areas
                <br />• Include multiple angles if possible
              </p>
            </div>
          </Card>

          {/* Recent Scans */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Disease History</h3>
            
            <div className="space-y-4">
              {diseaseHistory.map((record, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{record.disease}</h4>
                      <p className="text-sm text-muted-foreground">{record.crop}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      record.severity === 'High' ? 'bg-destructive/20 text-destructive' :
                      record.severity === 'Medium' ? 'bg-warning/20 text-warning' :
                      'bg-success/20 text-success'
                    }`}>
                      {record.severity}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Treatment:</strong> {record.treatment}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{record.date}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      record.status === 'Recovered' ? 'bg-success/20 text-success' :
                      record.status === 'Treated' ? 'bg-primary/20 text-primary' :
                      'bg-warning/20 text-warning'
                    }`}>
                      {record.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Common Diseases Guide */}
        <Card className="mt-8 p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <AlertTriangle className="h-6 w-6 mr-2 text-primary" />
            Common Diseases in Kerala
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commonDiseases.map((disease, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">{disease.name}</h4>
                
                <div className="mb-3">
                  <span className="text-sm font-medium text-muted-foreground">Affects: </span>
                  <span className="text-sm">{disease.crops.join(', ')}</span>
                </div>
                
                <div className="mb-3">
                  <span className="text-sm font-medium text-muted-foreground">Symptoms: </span>
                  <p className="text-sm">{disease.symptoms}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Prevention: </span>
                  <p className="text-sm">{disease.prevention}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <h4 className="font-semibold mb-2">📱 Mobile Scanner</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Use your phone camera for instant disease detection
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Open Mobile Scanner
            </Button>
          </Card>
          
          <Card className="p-4 text-center">
            <h4 className="font-semibold mb-2">🩺 Expert Consultation</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Connect with agricultural experts for complex cases
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Book Consultation
            </Button>
          </Card>
          
          <Card className="p-4 text-center">
            <h4 className="font-semibold mb-2">📊 Disease Reports</h4>
            <p className="text-sm text-muted-foreground mb-3">
              View detailed analytics of your farm's health
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View Reports
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CropDiseaseDetection;