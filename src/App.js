import EventPlanner from './EventPlanner.js';

class App {
  #eventPlanner;

  constructor() {
    this.#eventPlanner = new EventPlanner();
  }

  async run() {
    this.#eventPlanner.run();
  }
}

export default App;
