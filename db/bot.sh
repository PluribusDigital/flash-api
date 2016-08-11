#!/bin/bash

# Check that networking is up.
[ "$NETWORKING" = "no" ] && exit 0

# -----------------------------------------------------------------------------

image_name=flash-api-db
docker_tag="stsilabs/$image_name"
db_data_dir=/var/lib/postgresql/flash-data

# -----------------------------------------------------------------------------

build() {
    sudo rm -rf "$db_data_dir"
    docker build -t "$docker_tag" .
}

clean() {
    docker rmi $(docker images -f "dangling=true" -q)
}

run() {
    docker run -it -p "2345:5432" \
    -v "$db_data_dir:/var/lib/postgresql/data" \
    --env-file /home/vagrant/.env \
    --name "$image_name" "$docker_tag"
}

run-bg() {
    docker run -d -p "2345:5432" \
    -v "$db_data_dir:/var/lib/postgresql/data" \
    --env-file /home/vagrant/.env \
    --name "$image_name" "$docker_tag"
}

run-test() {
    exit 2
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
        clean "$f"
        build "$f"
        ;;
    run)
        run "$f" && \
        stop "$f"
        ;;
    run-bg)
        run-bg "$f"
        ;;
    push)
        push "$f"
        ;;
    stop)
        stop "$f"
        ;;
    test)
        run-test "$f" && \
        stop "$f"
        ;;
    *)
        echo "Usage: $0 {build | run | run-bg | push | stop | test}"
        exit 2
        ;;
esac
