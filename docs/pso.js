const M = 30;
const D = 5;

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

initArray();
initParticle();
Fg = Infinity;

let t = 0;
for ( t = 1; t <= Tmax; t++ ) {
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
  if ( Fg < Cr ) {
    break;
  }
  for ( let i = 0; i < M; i++ ) {
    for ( let d = 0; d < D; d++ ) {
      V[i][d] = w * V[i][d] + c * Math.random() * (Xp[i][d] - X[i][d]) + c * Math.random() *   (Xg[d] - X[i][d]);
      X[i][d] = X[i][d] + V[i][d];
    }
  }
}
console.log("終了時刻 t = " + t);
console.log("解の目的関数値 Fg = " + Fg);
console.log("解 Xg = [" + Xg + "]");

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
      V[i][d] = makeRand();
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
