bcrypt.hash('Password.1', 12).then(hash => ({ hash }))

psql -U dunder_mifflin -d recipe-builder-test -f ./migrations/do.create_user.sql