function transpile() {
	if [ -d "lib" ]; then
		gulp babel
	fi
}

function transpileall() {
	projectPrefix=$1

	uiCoreSuffix='-ui-core'
	projectUi="$projectPrefix$uiCoreSuffix"
	projectUiPath="${benchPath}$projectUi"
	(cd $projectUiPath && transpile)
	
	serverCoreSuffix='-server-core'
	projectServer="$projectPrefix$serverCoreSuffix"
	projectServerPath="${benchPath}$projectServer"
	(cd $projectServerPath && transpile)
	
	appSuffix='-app'
	projectApp="${benchPath}$projectPrefix$appSuffix"
	(cd $projectApp && transpile && gulp webpack)
	
	cd $projectApp
	echo "------------------------------"
	echo "------------------------------"
	echo "You have just transpiled $projectPrefix !!!"
	echo "Run your project via 'npm start'"
	echo "Unlink your project by running the following command: 'unlinkem $projectPrefix'"
}

function linkem() {
	projectPrefix=$1

	uiCoreSuffix='-ui-core'
	projectUi="$projectPrefix$uiCoreSuffix"
	projectUiPath="${benchPath}$projectUi"
	(cd $projectUiPath && npm install && npm link && transpile)
	
	serverCoreSuffix='-server-core'
	projectServer="$projectPrefix$serverCoreSuffix"
	projectServerPath="${benchPath}$projectServer"
	(cd $projectServerPath && npm install && npm link && transpile)
	
	appSuffix='-app'
	projectApp="${benchPath}$projectPrefix$appSuffix"
	(cd $projectApp && npm install && npm link $projectUi && npm link $projectServer && transpile && gulp webpack)
	
	cd $projectApp
	echo "------------------------------"
	echo "------------------------------"
	echo "You have just linked $projectPrefix !!!"
	echo "Run your project via 'npm start'"
	echo "Unlink your project by running the following command: 'unlinkem $projectPrefix'"
}

function unlinkem() {
	projectPrefix=$1

	uiCoreSuffix='-ui-core'
	projectUi="$projectPrefix$uiCoreSuffix"
	projectUiPath="${benchPath}$projectUi"
	(cd $projectUiPath && npm unlink)
	
	serverCoreSuffix='-server-core'
	projectServer="$projectPrefix$serverCoreSuffix"
	projectServerPath="${benchPath}$projectServer"
	(cd $projectServerPath && npm unlink)
	
	appSuffix='-app'
	projectApp="${benchPath}$projectPrefix$appSuffix"
	(cd $projectApp && npm unlink $projectUi && npm unlink $projectServer)
	
	cd $projectApp
	echo "------------------------------"
	echo "------------------------------"
	echo "You have just unlinked $projectPrefix !!!"
	echo "You can re link if needed by running the following command: 'linkem $projectPrefix'"
}

function unlinkall() {
	 npm list --depth=0 | grep '>' | xargs -n 1 | grep '@' | sed -re 's/\@.*//' | xargs npm unlink --
}

function documentLinking() {
    echo "---------------------------------------------"
    echo "--------------Linking Below------------------"
    echo "---------------------------------------------"
    echo 'linkem <project-prefix> - a script to link tripod based applications'
    echo 'unlinkem <project-prefix> - a script to unlink tripod based applications'
    echo 'unlinkall - a script to unlink all deps form current project'
    echo 'transpileall <project-prefix> - a script to transpile tripod based applications'
    echo 'transpile - a script to transpile a specific project. Smartly decides to babel'
}