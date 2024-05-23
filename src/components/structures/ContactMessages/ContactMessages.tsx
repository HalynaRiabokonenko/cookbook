import React from "react";
import { DataList, Flex, IconButton } from '@radix-ui/themes';
import { Timestamp } from "firebase/firestore";
import { CopyIcon } from "@radix-ui/react-icons";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MessageType {
    id: string;
    title: string;
    message: string;
    timestamp: Timestamp;
}

export const ContactMessages = ({ messageObj }: { messageObj: MessageType }) => {
    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.info("Message ID copied to clipboard");
        } catch (err) {
            toast.error("Failed to copy message ID to clipboard");
        }
    };

    return (
        <DataList.Root className="bg-white rounded-lg shadow-lg p-4">
            <DataList.Item className="flex justify-between py-2">
                <DataList.Label className="min-w-[88px] font-medium">Title</DataList.Label>
                <DataList.Value className="text-gray-700 break-words break-all">{messageObj.title}</DataList.Value>
            </DataList.Item>
            <DataList.Item className="flex justify-between py-2">
                <DataList.Label className="min-w-[88px] font-medium">Message</DataList.Label>
                <DataList.Value className="text-gray-700 break-words break-all">
                    {messageObj.message}
                </DataList.Value>
            </DataList.Item>
            <DataList.Item className="flex justify-between py-2">
                <DataList.Label className="min-w-[88px] font-medium">Time</DataList.Label>
                <DataList.Value className="text-gray-700 break-words break-all">
                    {messageObj.timestamp.toDate().toString()}
                </DataList.Value>
            </DataList.Item>
            <DataList.Item className="flex justify-between py-2">
                <DataList.Label className="min-w-[88px] font-medium">ID</DataList.Label>
                <DataList.Value>
                    <Flex align="center" gap="2" className="flex items-center gap-2">
                        <span
                            className="text-gray-500 cursor-pointer break-words break-all"
                            onClick={() => copyToClipboard(messageObj.id)}
                        >
                            {messageObj.id}
                        </span>
                        <IconButton
                            size="1"
                            aria-label="Copy value"
                            color="gray"
                            variant="ghost"
                            className="hover:bg-gray-100 p-1 rounded-full"
                            onClick={() => copyToClipboard(messageObj.id)}
                        >
                            <CopyIcon />
                        </IconButton>
                    </Flex>
                </DataList.Value>
            </DataList.Item>
        </DataList.Root>
    );
};
