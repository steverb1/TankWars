# start with the correct node images
FROM node:6

# Set AWS access keys for the account we are using
ENV AWS_ACCESS_KEY_ID=AKIAJKR3XNNPGSAVFQGQ
ENV AWS_SECRET_ACCESS_KEY=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

# Create app directory and expose it outside the container so that
# files can be edited outside the container
RUN mkdir -p /tank
WORKDIR /tank
VOLUME "/tank"

# copy the package.json files into the app-directory
COPY . ./

# install claudia globally in the container
RUN npm install -g -s claudia