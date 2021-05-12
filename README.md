# SeniorProject
Audio description prototyping platform based on web browsers

# How to access AWS S3 through command line

## Install and configure AWS CLI
1. Install [Aws CLI Version 2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
2. Configure credential with `aws configure` command
3. Input `AWS Access Key ID` with the same value in `.env` file
4. Input `AWS Secret Access Key` with the same value in `.env` file
5. Leave `Default region name` and `Default output format` blank 

<hr>
   
## Accessing the bucket through CLI


### List all buckets
Example and results:
```
$ aws s3 ls
2021-01-21 12:38:07 mediaplatformbucket
```

<hr>

### List all objects in a bucket
Syntax:
```
$ aws s3 ls <bucket_name>
```

Example and results:
```
$ aws s3 ls mediaplatformbucket
2021-01-28 14:54:31    6194556 1611820470383 - 1611214319059+-+test4.mp4
2021-01-28 14:56:10    4247346 1611820568481 - test10.mp4
```

<hr>

### Delete an object in a bucket
Syntax:
```
$ aws s3 rm <target> [--options]
```

Notes: `<target>` consists of `s3://<bucket_name>/<file_name>`

Example and results:
```
aws s3 rm s3://mediaplatformbucket/"1611820530221 - test3.mp4"
```

<hr>

## Also... DO NOT DELETE THE BUCKET !!!

And please read to this [guide](https://docs.amazonaws.cn/en_us/cli/latest/userguide/cli-services-s3-commands.html#using-s3-commands-before) if you have any further question
