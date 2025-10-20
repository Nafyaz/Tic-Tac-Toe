sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs bun nginx git

sudo bun install -g pm2

git clone https://github.com/Nafyaz/Tic-Tac-Toe

cd Tic-Tac-Toe

bun ci
bun run build

pm2 start build/index.js --name Tic-Tac-Toe
pm2 save
pm2 startup
