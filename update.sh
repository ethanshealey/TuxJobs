while getopts m: flag
do
	case "${flag}" in
		m) message=${OPTARG};;
	esac
done

git add --all
git commit -m "$message"
git push -u origin
