import EventPlanner from './controller/EventPlanner.js';

class App {
  #eventPlanner;

  constructor() {
    this.#eventPlanner = new EventPlanner();
  }

  async run() {
    await this.#eventPlanner.run();
  }
}

export default App;
