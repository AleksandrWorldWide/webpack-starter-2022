import Post from '@modules/Post.js'
import './styles/style.css'
import csv from './assets/data.csv'
import wow from '@/assets/wow.jpg'
import * as $ from 'jquery'
import './styles/scss.scss'
import './babel.js'

const post = new Post('webpack', wow);

$('pre').addClass('code').html(post.toString())

console.log(post);