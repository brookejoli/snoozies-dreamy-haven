import React, { useState } from 'react';
import { Search, Filter, Play, Heart, Clock, Star } from 'lucide-react';
import storiesData from '../data/stories.json';

const Stories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  // Get real stories from JSON file
  const stories = storiesData.stories || [];

  // Get all unique tags from all stories
  const allTags = ['all', ...new Set(stories.flatMap(story => story.tags || []))];

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || (story.tags && story.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Snoozies Story Collection
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            {stories.length > 0 
              ? `A growing library of ${stories.length} magical bedtime stories to help your little ones drift off to dreamland. Each story is crafted with love and designed for peaceful sleep.`
              : "Your magical bedtime story library is being prepared! Check back soon for calming tales designed for peaceful sleep."
            }
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Search and Filter - Only show if there are stories */}
        {stories.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for magical stories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Tag Filter */}
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Stories Count */}
        {stories.length > 0 && (
          <div className="mb-8">
            <p className="text-gray-600">
              {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} found
            </p>
          </div>
        )}

        {/* Stories Grid or Empty State */}
        {stories.length === 0 ? (
          // Empty state when no stories exist yet
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Star className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Story Library Awaits
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're preparing magical bedtime stories just for you! Once your automation is running, 
              beautiful new stories will appear here every week.
            </p>
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🌟 What to Expect:
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Clock className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Weekly Stories</h4>
                    <p className="text-sm text-gray-600">Fresh content every week</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Play className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Audio & Video</h4>
                    <p className="text-sm text-gray-600">Listen or watch along</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Search className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Easy Discovery</h4>
                    <p className="text-sm text-gray-600">Search and filter stories</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Heart className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Save Favorites</h4>
                    <p className="text-sm text-gray-600">Keep track of loved stories</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : filteredStories.length > 0 ? (
          // Show stories when they exist
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <div key={story.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative">
                  <img 
                    src={story.thumbnailUrl} 
                    alt={story.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder-thumb.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                    <button className="opacity-0 hover:opacity-100 bg-white bg-opacity-90 p-3 rounded-full transition-opacity">
                      <Play className="w-6 h-6 text-purple-600" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {story.duration}
                  </div>
                  <div className="absolute top-2 left-2">
                    <button className="bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-colors">
                      <Heart className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {story.excerpt}
                  </p>
                  
                  {story.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {story.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(story.publishedAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-1">
                        <Play className="w-4 h-4" />
                        Listen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // No results found state
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No stories found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {stories.length > 0 
              ? "Want new stories delivered weekly?"
              : "Be the first to get new stories!"
            }
          </h2>
          <p className="text-gray-600 mb-6">
            {stories.length > 0
              ? "Join thousands of parents getting fresh bedtime stories every week!"
              : "Sign up now and get notified when your first magical story is ready!"
            }
          </p>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
            Subscribe for Free Stories
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stories;
