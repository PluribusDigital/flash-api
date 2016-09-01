#!/bin/bash

# Check that networking is up.
[ "$NETWORKING" = "no" ] && exit 0

# -----------------------------------------------------------------------------

image_name=flash-api
docker_tag="stsilabs/$image_name"

docker_host_db=db
image_name_db=flash-api-db

# -----------------------------------------------------------------------------

build() {
    docker build -t "$docker_tag" "$HOME/api"
    return $?
}

clean() {
    docker rmi $(docker images -f "dangling=true" -q)
}

nuke() {
    docker stop $(docker ps -a -q)
    docker rm $(docker ps -a -q)
    docker rmi $(docker images -a -q)
}

run() {
    docker run -it -p "8080:8080" \
    --env-file /home/vagrant/.env \
    --link "$image_name_db":"$docker_host_db" \
    --name "$image_name" "$docker_tag"
    return $?
}

run-bg() {
    docker run -d -p "8080:8080" \
    --env-file /home/vagrant/.env \
    --link "$image_name_db":"$docker_host_db" \
    --name "$image_name" "$docker_tag"
}

run-test() {
    docker run -it -p "8080:8080" \
    --env-file /home/vagrant/.env \
    --link "$image_name_db":"$docker_host_db" \
    --name "$image_name" "$docker_tag" npm test
    return $?
}

push() {
    if [ -z "$1" ]
    then
        docker push "$docker_tag"
    else
        docker tag "$docker_tag" "$docker_tag:$1"        
        docker push "$docker_tag:$1"
    fi
    return $?
}

stop() {
    docker stop "$image_name" && docker rm "$image_name"
}

# -----------------------------------------------------------------------------

case $1 in
    build)
        clean
        build
        ;;
    nuke)
        nuke
        ;;
    run)
        clean
        build && \
        run
        stop
        ;;
    run-bg)
        clean
        build && \
        run-bg
        ;;
    push)
        clean
        build && \
        push $2
        ;;
    stop)
        stop
        ;;
    test)
        clean
        build && \
        run-test
        stop
        ;;
    *)
        echo "Usage: $0 {build | run | run-bg | push | stop | test}"
        exit 2
        ;;
esac
