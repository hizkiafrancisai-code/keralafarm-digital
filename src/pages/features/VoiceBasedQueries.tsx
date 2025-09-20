import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import { ArrowLeft, Mic, Volume2, MessageSquare, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const VoiceBasedQueries = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);

  const conversationHistory = [
    {
      question: "എന്റെ നെല്ലിന് എന്ത് വളം ഇടണം?",
      answer: "നിങ്ങളുടെ നെല്ല് വിളയ്ക്ക് NPK 20:10:10 വളം ഉപയോഗിക്കാം. ഏക്കറിന് 25 കിലോഗ്രാം എന്ന അളവിൽ പ്രയോഗിക്കുക.",
      timestamp: "2 hours ago",
      language: "Malayalam"
    },
    {
      question: "കാലാവസ്ഥ എങ്ങനെയാണ് നാളെ?",
      answer: "നാളെ മഴയ്ക്ക് സാധ്യതയുണ്ട്. 85% ആർദ്രതയും 26°C താപനിലയും പ്രതീക്ഷിക്കാം. നനയ്ക്കൽ ഒഴിവാക്കാം.",
      timestamp: "1 day ago",
      language: "Malayalam"
    },
    {
      question: "How do I protect coconut from pests?",
      answer: "For coconut pest protection, regular inspection is key. Use neem oil spray and maintain proper drainage around trees.",
      timestamp: "2 days ago",
      language: "English"
    }
  ];

  const quickQuestions = [
    "എന്റെ വിളയുടെ അവസ്ഥ എങ്ങനെ?",
    "ഇന്ന് കാലാവസ്ഥ എങ്ങനെ?",
    "എന്ത് വളം ഇടണം?",
    "കീടബാധ എങ്ങനെ തടയാം?",
    "വിതരണ വിലകൾ എന്തായിരുന്നു?",
    "മഴക്കാലത്ത് എന്ത് ചെയ്യണം?"
  ];

  const handleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecorded(true);
    } else {
      setIsRecording(true);
      setHasRecorded(false);
    }
  };

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
            Voice-Based Queries
          </h1>
          <p className="text-xl text-muted-foreground">
            Ask questions and get answers in Malayalam using voice commands
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Voice Interface */}
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Mic className="h-6 w-6 mr-2 text-primary" />
              Voice Assistant
            </h3>
            
            <div className="text-center mb-8">
              <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                isRecording 
                  ? 'bg-destructive animate-pulse shadow-lg' 
                  : hasRecorded 
                    ? 'bg-success' 
                    : 'bg-primary hover:bg-primary-dark'
              }`}>
                <button 
                  onClick={handleRecording}
                  className="w-full h-full flex items-center justify-center text-white"
                >
                  {isRecording ? (
                    <div className="w-8 h-8 bg-white rounded"></div>
                  ) : hasRecorded ? (
                    <Play className="h-12 w-12" />
                  ) : (
                    <Mic className="h-12 w-12" />
                  )}
                </button>
              </div>
              
              <div className="text-center">
                {isRecording ? (
                  <div>
                    <p className="text-lg font-semibold text-destructive mb-2">Recording...</p>
                    <p className="text-sm text-muted-foreground">Tap to stop recording</p>
                  </div>
                ) : hasRecorded ? (
                  <div>
                    <p className="text-lg font-semibold text-success mb-2">Recorded Successfully</p>
                    <p className="text-sm text-muted-foreground">Tap to play back or record again</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-semibold mb-2">Ready to Listen</p>
                    <p className="text-sm text-muted-foreground">Tap and speak your question in Malayalam or English</p>
                  </div>
                )}
              </div>
            </div>

            {hasRecorded && (
              <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Your Question:</span>
                  <Button size="sm" variant="ghost">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "എന്റെ തേങ്ങാമരത്തിന് എന്ത് വളം ഇടണം?"
                </p>
              </div>
            )}

            <div className="space-y-4">
              <Button className="w-full h-12" disabled={!hasRecorded}>
                <MessageSquare className="h-5 w-5 mr-2" />
                Get AI Answer
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-10">
                  <Mic className="h-4 w-4 mr-2" />
                  Malayalam
                </Button>
                <Button variant="outline" className="h-10">
                  <Mic className="h-4 w-4 mr-2" />
                  English
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Questions */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Quick Questions</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Tap on any question to ask directly
            </p>
            
            <div className="space-y-3">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="w-full p-4 text-left border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center">
                    <Mic className="h-4 w-4 mr-3 text-primary" />
                    <span className="text-sm">{question}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Conversation History */}
        <Card className="mt-8 p-6">
          <h3 className="text-xl font-semibold mb-6">Recent Conversations</h3>
          
          <div className="space-y-6">
            {conversationHistory.map((conversation, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs px-2 py-1 bg-muted rounded-full">
                    {conversation.language}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {conversation.timestamp}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-primary/10 border-l-4 border-primary rounded-r-lg">
                    <p className="text-sm font-medium mb-1">Your Question:</p>
                    <p className="text-sm">{conversation.question}</p>
                    <Button size="sm" variant="ghost" className="mt-2 p-0 h-auto">
                      <Volume2 className="h-3 w-3 mr-1" />
                      Play
                    </Button>
                  </div>
                  
                  <div className="p-3 bg-success/10 border-l-4 border-success rounded-r-lg">
                    <p className="text-sm font-medium mb-1">AI Answer:</p>
                    <p className="text-sm">{conversation.answer}</p>
                    <Button size="sm" variant="ghost" className="mt-2 p-0 h-auto">
                      <Volume2 className="h-3 w-3 mr-1" />
                      Play
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Features Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Natural Speech</h4>
            <p className="text-sm text-muted-foreground">
              Speak naturally in Malayalam or English. Our AI understands both languages perfectly.
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Instant Answers</h4>
            <p className="text-sm text-muted-foreground">
              Get immediate responses to your farming questions with detailed explanations.
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Volume2 className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Audio Responses</h4>
            <p className="text-sm text-muted-foreground">
              Listen to answers in your preferred language with clear pronunciation.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VoiceBasedQueries;