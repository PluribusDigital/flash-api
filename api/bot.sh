#!/bin/bash

# Check that networking is up.
[ "$NETWORKING" = "no" ] && exit 0

# -----------------------------------------------------------------------------

image_name=flash-api
docker_tag="stsilabs/$image_name"

# -----------------------------------------------------------------------------

build() {
    docker build -t "$docker_tag" .
}

clean() {
    docker rmi $(docker images -f "dangling=true" -q)
}

run() {
    docker run -it -p "8080:8080" \
    --env-file /home/vagrant/.env \
    --link flash-api-db:db \
    --name "$image_name" "$docker_tag"
}

run-bg() {
    docker run -d -p "8080:8080" \
    --env-file /home/vagrant/.env \
    --name "$image_name" "$docker_tag"
}

run-test() {
    docker run -it -p "8080:8080" \
    --env-file /home/vagrant/.env \
    --name "$image_name" "$docker_tag" npm test
}

push() {
    docker push "$docker_tag"
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
        push
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
