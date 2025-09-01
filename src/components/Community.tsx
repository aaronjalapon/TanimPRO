import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { MessageSquare, ThumbsUp, Award, Search, Plus, Filter, Clock, TrendingUp } from 'lucide-react';

export function Community({ user }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  
  const categories = [
    { id: 'all', name: 'All Topics', count: 45 },
    { id: 'corn', name: 'Corn', count: 12 },
    { id: 'rice', name: 'Rice', count: 18 },
    { id: 'pests', name: 'Pests & Diseases', count: 8 },
    { id: 'irrigation', name: 'Irrigation', count: 5 },
    { id: 'fertilizer', name: 'Fertilizers', count: 7 },
    { id: 'market', name: 'Market Tips', count: 6 }
  ];

  const questions = [
    {
      id: 1,
      title: 'Paano ko malalaman kung ready na ang corn ko for harvest?',
      content: 'Mga 95 days na ang corn ko. Yellowish na ang tassels pero hindi pa ako sure kung harvest time na.',
      author: {
        name: 'Miguel Santos',
        location: 'Nueva Ecija',
        avatar: null,
        badges: ['Expert Helper', 'Corn Specialist']
      },
      category: 'corn',
      replies: 7,
      upvotes: 23,
      createdAt: '2 hours ago',
      isAnswered: true,
      tags: ['harvest', 'corn', 'timing']
    },
    {
      id: 2,
      title: 'Brown spots on my rice leaves - need help!',
      content: 'I noticed brown spots appearing on my rice plants. They started small but are getting bigger. Is this a disease? What should I do?',
      author: {
        name: 'Maria Reyes',
        location: 'Laguna',
        avatar: null,
        badges: ['New Farmer']
      },
      category: 'pests',
      replies: 12,
      upvotes: 31,
      createdAt: '4 hours ago',
      isAnswered: true,
      tags: ['rice', 'disease', 'brown-spot']
    },
    {
      id: 3,
      title: 'Best fertilizer schedule for tomatoes?',
      content: 'First time growing tomatoes. What fertilizer should I use and when? My plants are 3 weeks old.',
      author: {
        name: 'Jose Cruz',
        location: 'Batangas',
        avatar: null,
        badges: []
      },
      category: 'fertilizer',
      replies: 5,
      upvotes: 15,
      createdAt: '1 day ago',
      isAnswered: false,
      tags: ['tomato', 'fertilizer', 'schedule']
    },
    {
      id: 4,
      title: 'Presyo ng palay sa Metro Manila ngayon?',
      content: 'May nakakaalam ba kung magkano ang buying price ng palay sa Manila ngayon? Planning to harvest next week.',
      author: {
        name: 'Ricardo Delos Reyes',
        location: 'Bulacan',
        avatar: null,
        badges: ['Market Expert']
      },
      category: 'market',
      replies: 3,
      upvotes: 8,
      createdAt: '2 days ago',
      isAnswered: true,
      tags: ['palay', 'price', 'manila']
    }
  ];

  const topContributors = [
    { name: 'Elena Villanueva', points: 2540, specialty: 'Rice Expert', answers: 127 },
    { name: 'Roberto Cruz', points: 1890, specialty: 'Pest Control', answers: 98 },
    { name: 'Carmen Santos', points: 1456, specialty: 'Organic Farming', answers: 76 }
  ];

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Expert Helper': return 'bg-purple-100 text-purple-800';
      case 'Corn Specialist': return 'bg-yellow-100 text-yellow-800';
      case 'Rice Expert': return 'bg-green-100 text-green-800';
      case 'Market Expert': return 'bg-blue-100 text-blue-800';
      case 'New Farmer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredQuestions = questions.filter(q => {
    if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;
    if (searchQuery && !q.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h2>Community Q&A</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Ask Question
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ask the Community</DialogTitle>
              <DialogDescription>
                Share your farming question with the community to get expert advice and help from fellow farmers.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="question-title">Question Title</Label>
                <Input 
                  id="question-title" 
                  placeholder="e.g., How to identify corn borer damage?"
                />
              </div>
              <div>
                <Label htmlFor="question-category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="question-content">Describe your question</Label>
                <Textarea 
                  id="question-content"
                  placeholder="Provide details about your farming situation, what you've observed, what you've tried..."
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="question-tags">Tags (optional)</Label>
                <Input 
                  id="question-tags" 
                  placeholder="e.g., pest, disease, harvest"
                />
              </div>
              <Button className="w-full">Post Question</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input 
                placeholder="Search questions..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name} ({cat.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="popular">Most Upvoted</SelectItem>
                  <SelectItem value="answered">Answered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {filteredQuestions.map((question) => (
            <Card key={question.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={question.author.avatar} />
                    <AvatarFallback className="text-xs">
                      {getInitials(question.author.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-sm mb-1">{question.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{question.author.name}</span>
                          <span>•</span>
                          <span>{question.author.location}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {question.createdAt}
                          </span>
                        </div>
                      </div>
                      {question.isAnswered && (
                        <Badge className="bg-green-100 text-green-800">
                          Answered
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {question.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {question.upvotes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {question.replies} replies
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        {question.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {question.author.badges.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {question.author.badges.map((badge, index) => (
                          <Badge key={index} className={getBadgeColor(badge)}>
                            <Award className="w-3 h-3 mr-1" />
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Top Contributors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="w-4 h-4" />
                Top Contributors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs">{contributor.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {contributor.answers} answers • {contributor.points} pts
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Questions Asked</span>
                  <span>3</span>
                </div>
                <div className="flex justify-between">
                  <span>Answers Given</span>
                  <span>7</span>
                </div>
                <div className="flex justify-between">
                  <span>Helpful Votes</span>
                  <span>24</span>
                </div>
                <div className="flex justify-between">
                  <span>Points Earned</span>
                  <span className="text-green-600">156</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Popular Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {['corn', 'rice', 'pest', 'fertilizer', 'harvest', 'disease', 'irrigation', 'seeds'].map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs cursor-pointer">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}