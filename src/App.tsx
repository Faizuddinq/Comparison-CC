import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import SearchBar from './components/SearchBar';
import ComparisonGrid from './components/ComparisonGrid';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        {/* Header placeholder */}
        <div className="h-16 bg-white shadow-sm mb-8"></div>

        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Company Environmental Comparison
          </h1>
          
          <SearchBar />
          <ComparisonGrid />
        </main>
      </div>
    </Provider>
  );
}

export default App;