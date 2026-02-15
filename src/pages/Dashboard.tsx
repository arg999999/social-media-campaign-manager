import { Box, Typography, Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux'


import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';

import { Doughnut, Bar } from 'react-chartjs-2';
import { selectDashboardStats } from '../features/campaigns/campaigns.selectors';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Dashboard = () => {


  const stats = useSelector(selectDashboardStats)

  if (!stats) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={4}>
        Dashboard
      </Typography>

      {/* STAT CARDS */}
      <Grid container spacing={3} mb={4}>
        {[
          { label: 'Total Campaigns', value: stats.totalCampaigns },
          { label: 'Total Budget ($)', value: stats.totalBudget },
          { label: 'Total Engagement', value: stats.totalEngagement }
        ].map((card) => (
          <Grid key={card.label} size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid #eee',
                height: 130,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Typography color="text.secondary">
                {card.label}
              </Typography>

              <Typography variant="h4" fontWeight={600} mt={1}>
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* CHARTS */}
      <Grid container spacing={3} alignItems="stretch">

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #eee',
              height: 420,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography fontWeight={600} mb={2}>
              Campaign Status Distribution
            </Typography>

            <Box sx={{ flex: 1 }}>
              <Doughnut
                data={{
                  labels: ['Draft', 'Scheduled', 'Published'],
                  datasets: [
                    {
                      data: [
                        stats.statusCount.draft,
                        stats.statusCount.scheduled,
                        stats.statusCount.published
                      ],
                      backgroundColor: ['#FFB020', '#2196F3', '#00C853'],
                      borderWidth: 2,
                      borderColor: '#ffffff',
                      hoverOffset: 12
                    }
                  ]
                }}
                options={{
                  maintainAspectRatio: false,
                  cutout: '65%',
                  animation: {
                    duration: 800,
                    easing: 'easeOutQuart'
                  },
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        boxWidth: 18,
                        padding: 20,
                        font: {
                          size: 13,
                          weight: 500
                        }
                      }
                    },
                    tooltip: {
                      backgroundColor: '#ffffff',
                      titleColor: '#111827',
                      bodyColor: '#111827',
                      borderColor: '#e5e7eb',
                      borderWidth: 1,
                      padding: 12,
                      cornerRadius: 8,
                      titleFont: {
                        size: 14,
                        weight: 600
                      },
                      bodyFont: {
                        size: 13
                      },
                      displayColors: true
                    }
                  }
                }}
              />
            </Box>

          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid #eee',
              height: 420,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography fontWeight={600} mb={2}>
              Platform Distribution
            </Typography>

            <Box sx={{ flex: 1 }}>
              <Bar
                data={{
                  labels: ['Instagram', 'Facebook', 'LinkedIn'],
                  datasets: [
                    {
                      data: [
                        stats.platformCount.Instagram,
                        stats.platformCount.Facebook,
                        stats.platformCount.LinkedIn
                      ],
                      backgroundColor: ['#6366F1', '#3B82F6', '#10B981'],
                      borderRadius: 8,
                      barThickness: 50,
                      hoverBackgroundColor: ['#4F46E5', '#2563EB', '#059669']
                    }
                  ]
                }}
                options={{
                  maintainAspectRatio: false,
                  animation: {
                    duration: 800,
                    easing: 'easeOutQuart'
                  },
                  interaction: {
                    mode: 'index',
                    intersect: false
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false
                      },
                      ticks: {
                        font: {
                          size: 13,
                          weight: 500
                        }
                      }
                    },
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: '#f1f5f9'
                      },
                      ticks: {
                        font: {
                          size: 12
                        }
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      display: false
                    },
                    tooltip: {
                      backgroundColor: '#ffffff',
                      titleColor: '#111827',
                      bodyColor: '#111827',
                      borderColor: '#e5e7eb',
                      borderWidth: 1,
                      padding: 12,
                      cornerRadius: 8,
                      titleFont: {
                        size: 14,
                        weight: 600
                      },
                      bodyFont: {
                        size: 13
                      }
                    }
                  }
                }}
              />
            </Box>

          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Dashboard;
