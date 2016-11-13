import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import _ from 'underscore';

import pc from './pc'

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  const pc_ = await pc();
  return res.send(pc_);
});

app.get('/volumes', async (req, res) => {
  const pc_ = await pc();
  const group = _.groupBy(pc_.hdd, 'volume');
  let volumes = {};
  _.map(group, function(gr, index){
    var sum = _.reduce(gr, function(memo,obj){ return memo + parseFloat(obj.size); }, 0 );
    console.log(index);
    volumes[index] = sum.toString() + "B";
  });

  return res.json(volumes);
});

app.get('/[a-zA-A_]+\/?*', async (req, res) => {
  const nodes = req.originalUrl.split("/");
  console.log(nodes); // /greet
  const pc_ = await pc();

  const clear_nodes = nodes.filter(function(n){ return n != undefined });
  var j = {};

  clear_nodes.map(function (node) {
    console.log(1);
    j = (typeof j !== 'undefined') ? j[node] : pc_[node];
    console.log(j);
  });

  if(typeof j !== 'undefined') return res.json(j);

  return res.status(404).send("Not found");

});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
