import { Line } from 'vue-chartjs';

export default Line.extend({
  mounted() {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Revenue',
          backgroundColor: '#00B76F',
          data: [40, 39, 10, 40, 39, 80, 40],
        },
      ],
    }, { responsive: true, maintainAspectRatio: false });
  },
});
