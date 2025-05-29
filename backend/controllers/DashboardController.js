import Dashboard from "../repositories/DashboardRepository.js";

class DashboardController {
  async taskPriorityByPercentage(req, res) {
    try {
      const result = await Dashboard.taskPriorityByPercentage();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async todoByStatusCount(req, res) {
    try {
      const result = await Dashboard.todoByStatusCount();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async taskByStatus(req, res) {
    try {
      const result = await Dashboard.taskByStatus();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new DashboardController();
