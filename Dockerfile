# Use an official Python runtime as a parent image
FROM python:3.9.6-alpine3.14

# Set the working directory to /app
WORKDIR /app

COPY requirements.txt .

RUN pip install  --trusted-host pypi.python.org -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV POWARR=app.py

# Run app.py when the container launches
CMD ["flask", "run", "--host=0.0.0.0", "--port=80"]
