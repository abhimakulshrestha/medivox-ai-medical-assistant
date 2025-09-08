"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { doctorAgent } from '../../_components/DoctorsAgentCard';
import { Circle, PhoneCall, PhoneOff, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Vapi from '@vapi-ai/web';
import { useRouter } from 'next/navigation';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

export type SessionDetail = {
  id:number,
  notes:string,
  sessionId:string,
  report:JSON,
  selectedDoctor:doctorAgent,
  createdOn:string
}

type messages = { 
  role: string;
  text: string;
}


function MedicalAgentPage() {
  const {sessionId} = useParams();
  const [sessionDetail,setSessionDetail] = useState<SessionDetail>();
  const [callStarted,setCallStarted] = useState(false);
  const [vapiInstance,setVapiInstance] = useState<any>();
  const [currentRole,setCurrentRole] = useState<string|null>();
  const [liveTranscript,setLiveTranscript] = useState<string>();
  const [messages,setMessages] = useState<messages[]>([]);
  const [loading,setLoading] = useState(false);
  const router= useRouter();

  
 

  useEffect(() => {
    sessionId&&GetSessionDetails();
  },[sessionId])

  const GetSessionDetails = async() =>{
    const result = await axios.get('/api/session-chat?sessionId='+sessionId);
    console.log(result.data);
    setSessionDetail(result.data);

  };

  const StartCall = ()=>{
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
  setVapiInstance(vapi);
  // Pass only assistantId to vapi.start, not a config object
  if (!sessionDetail?.selectedDoctor?.assistantId) {
    alert("No assistantId found for selected doctor. Please check your configuration.");
    return;
  }
  vapi.start(sessionDetail.selectedDoctor.assistantId);
  vapi.on('call-start', () => {
    console.log('Call started');
    setCallStarted(true);
  });
  vapi.on('call-end', () => {
    console.log('Call ended');
    setCallStarted(false);
  });
  vapi.on('message', (message) => {
    if (message.type === 'transcript') {
      const { role, transcriptType, transcript } = message;
      console.log(`${message.role}: ${message.transcript}`);
      if (transcriptType === 'partial') {
        setLiveTranscript(transcript);
        setCurrentRole(role);
      } else if (transcriptType === 'final') {
        setMessages((prev: any) => [...prev, { role: role, text: transcript }]);
        setLiveTranscript('');
        setCurrentRole(null);
      }
    }
  });
  vapi.on('speech-start', () => {
    console.log('Assistant started speaking');
    setCurrentRole('assistant');
  });
  vapi.on('speech-end', () => {
    console.log('Assistant stopped speaking');
    setCurrentRole('user');
  });
  // Handle Vapi error events (ejection, etc.)
  vapi.on('error', async (error) => {
    console.error('Vapi error event:', error);
    toast.error('Call ended due to error: ' + (error?.errorMsg || error?.error?.msg || 'Unknown error'));
    setCallStarted(false);
    setVapiInstance(null);
    // Always attempt to generate report, even if error
    await endCall();
  });
  };

  const endCall = async() => {
    setLoading(true);
    try {
      console.log('[endCall] vapiInstance:', vapiInstance);
      console.log('[endCall] messages:', messages);
      console.log('[endCall] sessionDetail:', sessionDetail);
      console.log('[endCall] sessionId:', sessionId);
      if (vapiInstance) {
        vapiInstance.stop();
        if (typeof vapiInstance.removeAllListeners === 'function') {
          vapiInstance.removeAllListeners('call-start');
          vapiInstance.removeAllListeners('call-end');
          vapiInstance.removeAllListeners('message');
          vapiInstance.removeAllListeners('speech-start');
          vapiInstance.removeAllListeners('speech-end');
          vapiInstance.removeAllListeners('error');
        }
        setCallStarted(false);
        setVapiInstance(null);
      }
      // Always attempt to generate report, even if vapiInstance is falsy
      const result = await GenerateReport();
      console.log('[endCall] GenerateReport result:', result);
      if (result && result.error) {
        toast.error('Report generation failed: ' + result.error);
      } else {
        toast.success('Your report is generated!');
        router.replace('/dashboard');
      }
    } catch (err: any) {
      console.error('[endCall] Error:', err);
      toast.error('Error ending call or generating report: ' + (err && err.message ? err.message : String(err)));
    }
    setLoading(false);
  };

  const GenerateReport = async () => {
    setLoading(true);
    try {
      console.log('[GenerateReport] messages:', messages);
      console.log('[GenerateReport] sessionDetail:', sessionDetail);
      console.log('[GenerateReport] sessionId:', sessionId);
      if (!messages || !sessionDetail || !sessionId) {
        console.error('[GenerateReport] Missing required data for report generation.', { messages, sessionDetail, sessionId });
        return { error: 'Missing required data for report generation.' };
      }
      const payload = {
        messages: messages,
        sessionDetail: sessionDetail,
        sessionId: sessionId
      };
      console.log('[GenerateReport] Sending payload:', payload);
      const result = await axios.post('/api/medical-report', payload);
      console.log('[GenerateReport] API response:', result);
      if (result.data && result.data.error) {
        console.error('[GenerateReport] API error:', result.data);
      }
      return result.data;
    } catch (err: any) {
      console.error('[GenerateReport] Error:', err);
      return { error: err && err.message ? err.message : String(err) };
    } finally {
      setLoading(false);
    }
  }
  // Remove stray usage of GenerateReport outside of event handlers
  return (
    <div className='p-5 border rounded-3xl shadow-md h-full bg-secondary'>
      <div className='flex justify-between items-center p-4 border-b'>
        <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center'>
          <Circle className={`h-4 w-4 rounded-full ${callStarted ? 'bg-green-500' : 'bg-red-500'}`} />
          {callStarted ? 'Connected' : 'Not Connected'}
        </h2>
        <h2 className='font-bold text-xl text-gray-400'>00:00</h2>
      </div>
      {sessionDetail && (
        <div className='flex flex-col items-center p-4 mt-10'>
          <Image
            src={sessionDetail?.selectedDoctor?.image}
            alt={sessionDetail?.selectedDoctor?.specialist}
            width={120}
            height={120}
            className='h-[100px] w-[100px] rounded-full object-cover mt-4 mx-auto'
          />
          <h2 className='font-bold text-lg text-gray-600 dark:text-gray-300'>
            {sessionDetail?.selectedDoctor?.specialist}
          </h2>
          <p className='text-sm text-gray-500 dark:text-gray-200'>AI Medical Voice Agent</p>

          <div className='mt-12 w-full px-10 md:px-28 lg:px-52 xl:px-72'>
            {messages?.slice(-4).map((msg: messages, index) => (
              <div
                key={index}
                className={`flex w-full mb-2 ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[70%] p-2 rounded-lg text-sm ${
                    msg.role === 'assistant'
                      ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                      : 'bg-blue-500 text-white dark:bg-blue-600'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {liveTranscript && liveTranscript.length > 0 && (
              <div
                className={`flex w-full mb-2 ${currentRole === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[70%] p-2 rounded-lg text-sm ${
                    currentRole === 'assistant'
                      ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                      : 'bg-blue-500 text-white dark:bg-blue-600'
                  }`}
                >
                  {liveTranscript}
                </div>
              </div>
            )}
          </div>

          {!callStarted ? (
            <Button className='mt-20' onClick={StartCall} disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className='animate-spin' />
                  <span>Starting...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <PhoneCall />
                  <span>Start Call</span>
                </span>
              )}
            </Button>
          ) : (
            <Button variant={'destructive'} onClick={endCall} disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className='animate-spin' />
                  <PhoneOff />
                  <span>Disconnecting...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <PhoneOff />
                  <span>Disconnect</span>
                </span>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default MedicalAgentPage;