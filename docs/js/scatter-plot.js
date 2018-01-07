function plot(X, M) {
  const x1 = new Array();
  const x2 = new Array();
  x1.push("x1");
  x2.push("x2");
  for ( let i = 0; i < M; i++ ) {
    x1.push(X[i][0]);
    x2.push(X[i][1]);
  }

  c3.generate({
    bindto: '#graph',
    padding: {
      right: 100,
      left: 100
    },
    data: {
      xs: {
        x2: 'x1',
      },
      columns: [
        x1,
        x2,
      ],
      colors: {
        x2: '#0000ff'
      },
      type: 'scatter'
    },
    axis: {
      x: {
        label: {
          text: 'x1',
          position: 'outer-center'
        },
        tick: {
          fit: false,
          format: d3.format('.1f')
        },
        max: 5,
        min: -5
      },
      y: {
        label: {
          text: 'x2',
          position: 'outer-middle'
        },
        tick: {
          format: d3.format('.1f')
        },
        padding: {
          top: 0,
          bottom: 0
        },
        max: 5,
        min: -5
      }
    },
    legend: {
      show: false
    }
  });
}
