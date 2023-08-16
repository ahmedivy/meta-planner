import os
import asyncio
from dotenv import load_dotenv
from metaapi_cloud_sdk import MetaApi
from datetime import datetime, timedelta

load_dotenv()

token = os.getenv("META_API_TOKEN")
login = os.getenv("MT_LOGIN")
password = os.getenv("MT_PASSWORD")
server_name = os.getenv("MT_SERVER")


async def meta_api_synchronization():
    api = MetaApi(token)
    try:
        # Add test MetaTrader account
        accounts = await api.metatrader_account_api.get_accounts()
        account = None
        for item in accounts:
            if item.login == login and item.type.startswith('cloud'):
                account = item
                break
        if not account:
            print('Adding MT5 account to MetaApi')
            account = await api.metatrader_account_api.create_account({
                'name': 'Test account',
                'type': 'cloud',
                'login': login,
                'password': password,
                'server': server_name,
                'platform': 'mt5',
                'application': 'MetaApi',
                'magic': 1000
            })
        else:
            print('MT5 account already added to MetaApi')

        #  wait until account is deployed and connected to broker
        if account.connection_status == "DISCONNECTED":
            print('Deploying account')
            await account.deploy()

        print('Waiting for API server to connect to broker (may take couple of minutes)')
        await account.wait_connected()

        # connect to MetaApi API
        connection = account.get_rpc_connection()
        await connection.connect()

        # wait until terminal state synchronized to the local state
        print('Waiting for SDK to synchronize to terminal state (may take some time depending on your history size)')
        await connection.wait_synchronized()

        # invoke RPC API (replace ticket numbers with actual ticket numbers which exist in your MT account)
        print('Testing MetaAPI RPC API')
        print('account information:', await connection.get_account_information())

    except Exception as err:
        # process errors
        if hasattr(err, 'details'):
            # returned if the server file for the specified server name has not been found
            # recommended to check the server name or create the account using a provisioning profile
            if err.details == 'E_SRV_NOT_FOUND':
                print(err)
            # returned if the server has failed to connect to the broker using your credentials
            # recommended to check your login and password
            elif err.details == 'E_AUTH':
                print(err)
            # returned if the server has failed to detect the broker settings
            # recommended to try again later or create the account using a provisioning profile
            elif err.details == 'E_SERVER_TIMEZONE':
                print(err)
        print(api.format_error(err))
    exit()

asyncio.run(meta_api_synchronization())
