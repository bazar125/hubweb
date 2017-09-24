import { Pie } from 'vue-chartjs';

export default Pie.extend({
  mounted() {
    this.renderChart({
      labels: ['Collisions', 'Citations'],
      datasets: [
        {
          backgroundColor: [
            '#c62828',
            '#1565c0',
          ],
          // data: [40, 20, 80, 10],
          data: [20, 40],
        },
      ],
    }, { responsive: true, maintainAspectRatio: false });
  },
});
