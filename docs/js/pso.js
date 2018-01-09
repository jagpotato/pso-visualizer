const M = 30;
const D = 2;

const c = 1.494;
const w = 0.729;
const Tmax = 1000;
const Cr = 1e-5;
const Xmin = -5;
const Xmax = 5;

let X = new Array(M);
let V = new Array(M);
let F = new Array(M);
let Fp = new Array(M);
let Xp = new Array(M);
let Fg;
let Xg = new Array(D);

function pso() {
  // 初期化
  initArray();
  initParticle();
  Fg = Infinity;

  initTable();

  let t = 0;
  let x1, x2;
  loop();
  function loop() {
    t++;
    if ( D == 2 ) {
      plot(X, M);
    }
    for ( let i = 0; i < M; i++ ) {
      F[i] = sphere(i);
      // F[i] = rastrigin(i);
      if ( F[i] < Fp[i] ) {
        Fp[i] = F[i];
        for ( let d = 0; d < D; d++ ) {
          Xp[i][d] = X[i][d];
        }
        if ( Fp[i] < Fg ) {
          for ( let d = 0; d < D; d++ ) {
            Xg[d] = X[i][d];
          }
          Fg = Fp[i];
        }
      }
    }
    // 表の更新
    appendTd(t, Fg, Xg);
    //
    let timerId = setTimeout(loop, 150);
    if ( Fg < Cr || t == Tmax ) {
      changeLastTrColor();
      console.log("終了時刻 t = " + t);
      console.log("解の目的関数値 Fg = " + Fg);
      console.log("解 Xg = [" + Xg + "]");
      clearTimeout(timerId);
    }
    for ( let i = 0; i < M; i++ ) {
      for ( let d = 0; d < D; d++ ) {
        V[i][d] = w * V[i][d] + c * Math.random() * (Xp[i][d] - X[i][d]) + c * Math.random() * (Xg[d] - X[i][d]);
        X[i][d] = X[i][d] + V[i][d];
      }
    }
  }
}

function sphere(i) {
  let result = 0;
  for ( let d = 0; d < D; d++ ) {
    result += Math.pow(X[i][d], 2);
  }
  return result;
}

function rastrigin(i) {
  let result = 0;
  for ( let d = 0; d < D; d++ ) {
    result += Math.pow(X[i][d], 2) - 10 * Math.cos(2 * Math.PI * X[i][d]) + 10;
  }
  return result;
}

function initParticle() {
  for ( let i = 0; i < M; i++ ) {
    for ( let d = 0; d < D; d++ ) {
      X[i][d] = makeRand();
      // V[i][d] = makeRand();
      V[i][d] = 0.0;
    }
  }
}

function initArray() {
  for ( let i = 0; i < M; i++ ) {
    X[i] = new Array(D);
    V[i] = new Array(D);
    Xp[i] = new Array(D);
    Fp[i] = Infinity;
  }
}

function makeRand() {
  return Math.random() * (Xmax - Xmin) + Xmin;
}
