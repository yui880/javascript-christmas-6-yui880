import InputView from '../view/InputView.js';
import VisitDate from '../model/VisitDate.js';

class EventPlannerController {
  #visitDate;

  async play() {
    const day = await this.#getVisitDay();
  }

  async #getVisitDay() {
    const visitDate = await InputView.readVisitDate();
    this.#visitDate = new VisitDate(visitDate);

    return visitDate;
  }
}

export default EventPlannerController;
