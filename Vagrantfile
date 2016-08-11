# -*- mode: ruby -*-
# vi: set ft=ruby :

project = "flash-api"
container_root = "/home/vagrant"

# ----------------------------------------------------------------------------- 
# Configure the VM
# ----------------------------------------------------------------------------- 

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.box_check_update = false

  config.vm.network "private_network", ip: "192.168.50.10"

  config.vm.synced_folder ".", "#{container_root}"

  config.vm.provider "virtualbox" do |v|
    v.name = project
    v.memory = 2000
    v.cpus = 2
  end

  # https://github.com/Varying-Vagrant-Vagrants/VVV/issues/517
  config.vm.provision "fix-no-tty", type: "shell" do |s|
    s.privileged = false
    s.inline = "sudo sed -i '/tty/!s/mesg n/tty -s \\&\\& mesg n/' /root/.profile"
  end

  # Install docker
  config.vm.provision "docker"

  # Update helper files
  config.vm.provision "shell", inline: "chmod 554 #{container_root}/db/bot.sh"

  # Build and run the database container
  config.vm.provision "shell" do |s|
    s.inline = "cd #{container_root}/db && ./bot.sh build && ./bot.sh run-bg"
  end
 
end