// src/pages/Stories.tsx
import React, { useState } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import storiesData from '../data/stories.json';
import { StoryCard } from '../components/StoryCard';

const Stories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const stories = storiesData.stories || [];
  const allTags = ['all', ...new Set(stories.flatMap(story => story.tags || []))];

  const filteredStories = stories.filter(story => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || (story.tags && story.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Snoozies Story Collection</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            {stories.length > 0
              ? `A growing library of ${stories.length} magical bedtime stories.`
              : "Your magical bedtime story library is being prepared! Check back soon."}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Search & Filter */}
        {stories.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
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

        {/* Stories Grid or Empty State */}
        {stories.length === 0 ? (
          // Empty state when no stories exist yet
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Star className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Story Library Awaits</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're preparing magical bedtime stories just for you! Once your automation is running, beautiful new stories will appear here every week.
            </p>
          </div>
        ) : filteredStories.length > 0 ? (
          // Render using StoryCard
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <StoryCard
                key={story.id}
                id={story.id}
                title={story.title}
                excerpt={story.excerpt}
                duration={story.duration}
                thumbnailUrl={story.thumbnailUrl}
                publishedAt={story.publishedAt}
                tags={story.tags}
                onClick={() => {}}
              />
            ))}
          </div>
        ) : (
          // No results found state
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No stories found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;
