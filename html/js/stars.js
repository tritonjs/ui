"use strict";var requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}(),gr,BGStars=function(){var t=this;this.STOPPED=!1,this.canvas=$("#bg-stars"),this.NAME="#bg-stars",this.stage=new PIXI.Stage(0),this.renderer=PIXI.autoDetectRenderer(this.canvas.width(),this.canvas.height(),this.canvas.get(0),!0,!0),this.NUM_POINTS=80,this.points=[],this.radius=2,this.width=this.canvas.width(),this.height=this.canvas.height(),this.init=function(){gr=new PIXI.Graphics,t.stage.addChild(gr);for(var i=0;i<t.NUM_POINTS;i++){var n=Math.random()*t.width,a=Math.random()*t.height,r=this.randBtwn(-3,3),e=this.randBtwn(-3,3),s=this.randBtwn(1,4.9);t.points.push({x:n,y:a,vY:e,vX:r,vY0:e,vX0:r,radius:s})}t.animate()},this.animate=function(){gr.clear(),gr.beginFill(16777215);var i,n;for(n=0;n<t.points.length;n++)i=t.points[n],gr.drawCircle(i.x,i.y,i.radius);gr.endFill(),t.renderer.render(t.stage)},this.randBtwn=function(i,n){var a=0,r=n-i,e=Math.ceil(Math.log2(r));if(e>53)throw new Exception("We cannot generate numbers larger than 53 bits.");var s=Math.ceil(e/8),h=Math.pow(2,e)-1,o=new Uint8Array(s);window.crypto.getRandomValues(o);for(var w=8*(s-1),d=0;d<s;d++)a+=o[d]*Math.pow(2,w),w-=8;return a&=h,a>=r?t.randBtwn(i,n):i+a}},main=function(){if("#/login"!==window.location.hash&&"#/register"!==window.location.hash)return console.info("not generating stars");$("#bg-stars").attr("width",$(window).width()),$("#bg-stars").attr("height",$(window).height());var t=new BGStars;t.init()};$(document).ready(main),router&&(console.log("stars is using router."),window.ROUTER.bind(main));