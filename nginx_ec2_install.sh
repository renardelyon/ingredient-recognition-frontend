# SSH into EC2
ssh -i ~/.ssh/id_ed25519 ec2-user@$(terraform output -raw ec2_public_ip)

# Run the commands manually
sudo dnf install -y nginx certbot python3-certbot-nginx

sudo sed -i '/http {/a \    server_names_hash_bucket_size 128;' /etc/nginx/nginx.conf

# Create Nginx config
sudo tee /etc/nginx/conf.d/app.conf << 'EOF'
server {
    listen 80;
    server_name frontend.recipe-recommendation-renard-elyon.mooo.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF

# Remove default config
sudo rm -f /etc/nginx/conf.d/default.conf

# Start Nginx
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl start nginx

# Get SSL certificate
sudo certbot --nginx -d frontend.recipe-recommendation-renard-elyon.mooo.com \
  --non-interactive \
  --agree-tos \
  --email renard.elyon.r@gmail.com \
  --redirect

# Setup auto-renewal - create directory if it doesn't exist
sudo mkdir -p /etc/cron.d
sudo sh -c "echo '0 0,12 * * * root certbot renew --quiet --post-hook \"systemctl reload nginx\"' > /etc/cron.d/certbot-renew"
sudo chmod 644 /etc/cron.d/certbot-renew