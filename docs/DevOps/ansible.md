# Ansible


## Runbook

```yaml

- hosts: our_host
  become: true
  roles:
    - install_docker
    - datadisk_format
    - { role: install_ourhost, tags: [app_install] }

```

## Configuring `ansible.cfg`

```yml
[defaults]
ansible_ssh_private_key_file = /root/.ssh/google_compute_engine
host_key_checking = False
[inventory]
enable_plugins = gcp_compute, ini
unparsed_is_failed = False

```

## Inventory

`env/sbx/inventory.gcp.yml`

```yml
plugin: gcp_compute
projects:
- target-project-sbx-1234
filters:
   - status="RUNNING"
   - labels.application="myapp"
   - labels.environment="sbx"
hostnames:
  - name
  - private_ip
compose:
  ansible_host: networkInterfaces[0].networkIP

inventory_ip_type:
- internal
auth_kind: serviceaccount
keyed_groups:
  - key: labels.purpose

```

## Useful stuff

### Disks

```yaml
---
- name: Create data disk VG
  lvg:
    vg: "mongo_vg"
    pvs: "{{ mongodb_data_drive_devices | join(',') }}"
    state: present

- name: Resize (grow) PVs if underlying device has free space
  shell: pvresize -v "{{ mongodb_data_drive_devices | join(' ') }}"

- name: Create data disk LV
  lvol:
    lv: "mongo_lv"
    vg: "mongo_vg"
    size: "100%VG"
    active: yes
    state: present

- name: Create data disk filesystem
  filesystem:
    dev: /dev/mongo_vg/mongo_lv
    fstype: ext4
    resizefs: yes

- name: Create data disk mount point
  file:
    path: "{{ mongo_data_mountpoint }}"
    mode: 0770
    state: directory


- name: Mount data disk
  mount:
    fstype: ext4
    path: "{{ mongo_data_mountpoint }}"
    src: /dev/mongo_vg/mongo_lv
    state: mounted


- name: Create data folders
  file:
    path: "{{ item }}"
    mode: 0770
    state: directory
  loop:
    - "{{ mongo_data_path }}"
    - "{{ mongo_backup_data_path }}"
```

### Install docker

```yaml

 
- name: disable SELinux
  selinux: state=permissive policy=targeted
  register: st

- name: reboot if SELinux changed
  shell: "sleep 5 && reboot"
  async: 1
  poll: 0
  ignore_errors: true
  when: st.changed

- name: Wait for the reboot to complete if there was a change.
  wait_for_connection:
    connect_timeout: 20
    sleep: 5
    delay: 5
    timeout: 300
  when: st.changed

- name: Remove older docker packages if exists
  yum:
    name: "{{ old_packages }}"
    state: absent

- name: Install yum-utils
  yum:
    name: yum-utils
    update_cache: yes
    state: present


- name: Add docker repo
  command: yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo


- name: Install required packages
  yum:
    name: "{{ packages }}"
    update_cache: yes
    state: present

- name: Enable docker service
  systemd:
    name: docker
    state: started
    enabled: yes

```

Defaults:

```yaml
old_packages:
      - docker
      - docker-client
      - docker-client-latest
      - docker-common
      - docker-latest
      - docker-latest-logrotate
      - docker-logrotate
      - docker-engine


packages:
      - docker-compose
      - docker-ce 
      - docker-ce-cli 
      - containerd.io
      - zip
      - unzip
      - lvm2
```


### Check output

```
- name: Print Out PATH
  debug:
  msg: "PATH: {{ path_out }}"

- name: "Add {{ item }} to PATH."
  raw: SETX /M PATH "$($([Environment]::GetEnvironmentVariables("Machine").Path -split '\r\n'));{{ item }}"
  when: path_out.stdout.find(item) == -1
  changed_when: true
```