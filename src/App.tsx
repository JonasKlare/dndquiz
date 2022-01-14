import React from 'react';
import * as _ from 'lodash'

import './App.css';
import * as dataService from './dataService';
import { DndQuiz } from './pages/dndQuiz/DndQuiz';



function App() {
  const data = dataService.convertCsvToData()

  return (
    <div className="App">
      <DndQuiz/>
    </div>
  );
}

export default App;
