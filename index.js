const { create, zahraaafarelll } = require('@open-wa/wa-automate')
const msgHandler = require('./msgHndlr')
const options = require('./options')

const start = async (zahraaafarelll = new zahraaafarelll()) => {
        console.log('[ MFarelS ] Bot Nulis Telah Aktif')
        // Force it to keep the current session
        zahraaafarelll.onStateChanged((state) => {
            console.log('[ Bermasalah ]', state)
            if (state === 'CONFLICT' || state === 'UNLAUNCHED') zahraaafarelll.forceRefocus()
        })
        // listening on message
        zahraaafarelll.onMessage((async (message) => {
            zahraaafarelll.getAmountOfLoadedMessages()
            .then((msg) => {
                if (msg >= 3000) {
                    zahraaafarelll.cutMsgCache()
                }
            })
            msgHandler(zahraaafarelll, message)
        }))

        zahraaafarelll.onGlobalParicipantsChanged((async (heuh) => {
            await welcome(zahraaafarelll, heuh)
            //left(zahraaafarelll, heuh)
            }))
        
        zahraaafarelll.onAddedToGroup(((chat) => {
            let totalMem = chat.groupMetadata.participants.length
            if (totalMem < 10) { 
            	zahraaafarelll.sendText(chat.id, `Minimal Add Bot 10 Member`).then(() => zahraaafarelll.leaveGroup(chat.id)).then(() => zahraaafarelll.deleteChat(chat.id))
            } else {
                zahraaafarelll.sendText(chat.groupMetadata.id, `Hi Warga Grup *${chat.contact.name}* THX Yaw!!! Udah Nambahin BOT Nulis Ini Ke Grup *${chat.contact.name}*\nUntuk Melihat Menu Silahkan Ketik #help Atau #menu\n\nUntuk Menulis Silahkan Cek Menu.`)
            }
        }))

        /*zahraaafarelll.onAck((x => {
            const { from, to, ack } = x
            if (x !== 3) zahraaafarelll.sendSeen(to)
        }))*/

        // listening on Incoming Call
        zahraaafarelll.onIncomingCall(( async (call) => {
            await zahraaafarelll.sendText(call.peerJid, 'Lu Nelpon Gw? Fix Lu Suka Sama Gw!, Lu Cinta Sama Gw!\nUdah Jujur Aja!\nGamau Jujur Gw Block!\nUnblock? wa.me/6281219087237')
            .then(() => zahraaafarelll.contactBlock(call.peerJid))
        }))
    }

create('MFarelS', options(true, start))
    .then(zahraaafarelll => start(zahraaafarelll))
    .catch((error) => console.log(error))
