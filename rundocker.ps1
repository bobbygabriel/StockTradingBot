docker build -t "capstone:TradingBot" .
docker run --name deploy -dp 3000:3000 capstone:TradingBot