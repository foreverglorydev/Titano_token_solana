const util = require('util');
const exec = util.promisify(require('child_process').exec);
//  node param 
var arguments = process.argv
var _count = arguments[2];      if(!_count) _count = "1";     //NFTs counts (must be set)
var _env = arguments[3];        if(!_env) _env =  "devnet";   //net name
var _keypair = arguments[4];    if(!_keypair) _keypair =  "~/.config/solana/id.json";  //user wallet keypair
var _cache_name = arguments[5]; if(!_cache_name) _cache_name =  "temp";
var _price = arguments[6];      if(!_price) _price =  "0.55"; //NFT price

var result;

/**
 * Steps of install project
 *  - "solana wallet set"
 *  - solana config set --url devnet
 *  - solana airdrop 5
 *  - cd rust
 *  - cargo build-bpf
 *  - "solana deploy"
 *  - cd ../js/packages
 *  - yarn && yarn bootstrap
 * 
 * Mint step
 *  - node command.js 5(this num is counts)
 */

async function ls() {

  //image upload command line
   _command = 'ts-node ' + "./" + 'js/packages/cli/src/candy-machine-cli.ts upload ./assets --env ' + _env + ' --keypair '+ _keypair +'';
  console.log("------command line -----" + _command);
  result = await exec(_command);
  console.log('stdout:', result.stdout); console.log('stderr:', result.stderr); if(result.stderr) return;

  //image verify command line
  _command = 'ts-node ' + "./" + 'js/packages/cli/src/candy-machine-cli.ts verify --env ' + _env + ' --keypair '+ _keypair +'';
  console.log("------command line -----" + _command);
  result = await exec(_command);
  console.log('stdout:', result.stdout); console.log('stderr:', result.stderr); if(result.stderr) return;

  //create candy machine command line
  _command = 'ts-node ' + "./" + 'js/packages/cli/src/candy-machine-cli.ts create_candy_machine --env ' + _env + ' --keypair '+ _keypair +'';
  console.log("------command line -----" + _command);
  result = await exec(_command);
  console.log('stdout:', result.stdout); console.log('stderr:', result.stderr); if(result.stderr) return;

   //update candy machine command line

  _command = 'ts-node ' + "./" + 'js/packages/cli/src/candy-machine-cli.ts update_candy_machine --env ' + _env + ' --keypair '+ _keypair +' --price ' + _price + ' --date "01 Oct 2021 00:00:00 GMT"';
   console.log("------command line -----" + _command);
   result = await exec(_command);
   console.log('stdout:', result.stdout); console.log('stderr:', result.stderr); if(result.stderr) return;
 
   //mint_one_token command line
 
   for(var i = 0; i < parseInt(_count); i++){
     _command = 'ts-node ' + "./" + 'js/packages/cli/src/candy-machine-cli.ts mint_one_token --env ' + _env + ' --keypair '+ _keypair +'  --cache-name ' + _cache_name;
     console.log("------command line -----" + _command);
     result = await exec(_command);
     console.log('stdout:', result.stdout); console.log('stderr:', result.stderr); // if(result.stderr) return;
   }
 
  
  return;
}
ls();
