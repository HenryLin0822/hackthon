import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Box } from '@mui/material';

const ChartA = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['9/1', '9/2', '9/3', '9/4', '9/5', '9/6', '9/7', '9/8', '9/9', '9/10'],
        datasets: [
          {
            label: '預測人流量',
            data: [9059.62896952247, 5699.75154096388, 6321.249149759802, 6488.406687029095, 7538.06458190979, 8400.436582125807, 8993.191137842528, 9178.36790418229, 5661.165503108311, 6467.956582495602],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            pointBackgroundColor: 'white', // Dataset points
            pointBorderColor: 'white',
            pointRadius: 5,
            borderWidth: 2
          }
        ]
      },
      options: {
        animation: {
          duration: 5000, // 5-second animation
          easing: 'easeInOutQuad'
        },
        scales: {
          x: {
            grid: {
              color: 'white', // White grid lines
              lineWidth: 2
            },
            ticks: {
              color: 'white', // Make x-axis labels white
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          },
          y: {
            grid: {
              color: 'white', // White grid lines
              lineWidth: 2
            },
            ticks: {
              color: 'white', // Make y-axis labels white
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'white', // Make "My Dataset" label white
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          },
          tooltip: {
            titleFont: { size: 16, weight: 'bold', color: 'white' }, // Tooltip title in white
            bodyFont: { size: 14, color: 'white' }, // Tooltip body text in white
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark tooltip background
            titleColor: 'white',
            bodyColor: 'white'
          }
        }
      }
    });
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        backdropFilter: 'blur(20px)', // 20px background blur
        WebkitBackdropFilter: 'blur(20px)', // Safari support
        padding: '20px',
        borderRadius: '16px', // Rounded border
        border: '2px solid white', // White border
        overflow: 'hidden',
        color: 'white', // Set all text inside to white
        width:"80%",
      }}
    >
      <canvas ref={chartRef} />
    </Box>
  );
};

export default ChartA;
