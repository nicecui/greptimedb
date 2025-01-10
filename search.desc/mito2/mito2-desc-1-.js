searchState.loadedDescShard("mito2", 1, "Semantic type of the column.\nAn in-memory column chunk\nImplements <code>PageIterator</code> for a single column chunk, …\nFull column chunk and its offset\nAn in-memory collection of column chunks\nColumn chunk data representing only a subset of data pages\nAssigns uncompressed chunk binary data to …\nReturns whether we cache uncompressed pages for the column.\nCompressed page of each column.\nCreates a page reader to read column at <code>i</code>.\nCreate PageReader from RowGroupBase::column_chunks\nRow group level cached pages for each column.\nCreates a new InMemoryRowGroup by <code>row_group_idx</code>.\nFetches the necessary column data into memory\nTry to fetch data from WriteCache, if not in WriteCache, …\nFetches pages for columns if cache is enabled. If the page …\nFetches data from write cache. Returns <code>None</code> if the data is …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nObject store.\nSet of data pages included in this sparse chunk. Each …\nLength of the full column chunk\nHelper function to either add a new <code>RowSelector</code> to …\nIntersects two <code>RowSelection</code>s.\nConverts an iterator of row ranges into a <code>RowSelection</code> by …\nConverts an iterator of sorted row IDs into a <code>RowSelection</code>.\nStatistics for pruning row groups.\nReturns the column id of specific column name if we need …\nThe metadata of the region. It contains the schema a query …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCreates a new statistics to prune specific <code>row_groups</code>.\nHelper to read the SST.\nMetadata of SST row groups.\nParquet SST writer.\nWorkaround for AsyncArrowWriter does not provide a method …\nCustomizes per-column config according to schema and maybe …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nRegion metadata of the source and the target SST.\nCreates a new parquet SST writer.\nNumber of rows fetched.\nTime range of fetched batches.\nIterates source and writes all rows to Parquet file.\nMetadata of files in the same SST level.\nA version of all SSTs in a region.\nAdd files to the version.\nHandles of SSTs in this level.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns expired SSTs from current level.\nReturns SST index files’space occupied in current …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nLevel number.\nReturns a slice to metadatas of all levels.\nSST metadata organized by levels.\nMarks all SSTs in this version as deleted.\nReturns a new SstVersion.\nReturns an empty meta of specific <code>level</code>.\nReturns the number of rows in SST files. For historical …\nRemove files from the version.\nReturns SST data files’space occupied in current version.\nDefault implementation of the time provider based on std.\nTrait to get current time and deal with durations.\nReturns current time in millis.\nReturns millis elapsed since specify time.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nComputes the actual duration to wait from an expected one.\nWAL entry id.\nWrite ahead log.\nA stream that yields tuple of WAL entry id and …\nWAL batch writer.\nAdd a wal entry for specific region to the writer’s …\nEntries to write.\nBuffer to encode WAL entry.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCreates a new Wal from the log store.\nMark entries whose ids <code>&lt;= last_id</code> as deleted.\nReturns a [OnRegionOpened] function.\nProviders of regions being written into.\nScan entries of specific region starting from <code>start_id</code> …\nLog store of the WAL.\nThe underlying log store.\nReturns a WalEntryReader\nWrite all buffered entries to the WAL.\nReturns a writer to write to the WAL.\nThe default buffer size of the Entry receiver.\nWalEntryDistributor distributes Wal entries to specific …\nReceives the Wal entries from WalEntryDistributor.\nWaits for the arg from the WalEntryReader.\nSends the <code>start_id</code> to the WalEntryDistributor.\nReturns WalEntryDistributor and batch WalEntryReceivers.\nDistributes entries to specific WalEntryReceivers based on …\nReceives the Entry from the WalEntryDistributor.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nSends Entry to receivers based on RegionId\nA Reader reads the [RawEntry] from RawEntryReader and …\nWalEntryReader provides the ability to read and decode …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nA stream that yields Entry.\nImplement the RawEntryReader for the LogStore.\nRawEntryReader provides the ability to read Entry from the …\nA RawEntryReader reads [RawEntry] belongs to a specific …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nInterval to check whether regions should flush.\nMax delay to check region periodical tasks.\nWorker to write and alter regions bound to it.\nBackground worker loop to handle requests.\nBuffer for stalled write requests.\nA fixed size group of RegionWorkers.\nIdentifier for a worker.\nWrapper that only calls event listener in tests.\nWorker start config.\nAppends stalled requests.\nReturns cache of the group.\nCache.\nCache.\nCleans up the worker.\nCompaction background job pool.\nScheduler for compaction tasks.\nEngine config.\nRegions that are not yet fully dropped.\nEstimated size of all stalled requests.\nFlush background job pool.\nFlushes regions periodically.\nWatch channel receiver to wait for background flush job.\nWatch channel receiver to wait for background flush job.\nFinds some regions to flush to reduce write buffer usage.\nSchedules background flush requests.\nWatch channel sender to notify workers to handle stalled …\nWatch channel sender to notify workers to handle stalled …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns region of specific <code>region_id</code>.\nReturns region of specific <code>region_id</code>.\nHandle to the worker thread.\nHandling alter related requests.\nHandles region metadata changes.\nHandles requests that changes region options, like TTL. It …\nHandles region background request\nHandling catchup request.\nHandling close request.\nWhen compaction fails, we simply log the error.\nHandles compaction finished, update region version and …\nHandles compaction request submitted to region worker.\nHandling create request.\nTakes and handles all ddl requests.\nHandling drop request.\nHandling flush related requests.\nOn region flush job failed.\nOn region flush job finished.\nHandles manual flush request.\nHandles manifest.\nWrites region change action to the manifest and then …\nHandles region change result.\nWrites truncate action to the manifest and then applies it …\nHandling open request.\nHandle periodical tasks such as region auto flush.\nHandles region edit request.\nHandles region edit result.\nHandles a specific region’s stalled requests.\nDispatches and processes requests.\nHandles all stalled write requests.\nHandling truncate related requests.\nHandles truncate result.\nHandling write requests.\nTakes and handles all write requests.\nId of the worker.\nId of the worker.\nIntermediate manager for inverted index.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns true if the worker contains specific region.\nReturns true if the specific region exists.\nReturns true if the region is opening.\nReturns true if the specific region is opening.\nReturns true if the worker is still running.\nLast time to check regions periodically.\nEvent listener for tests.\nChecks whether the engine reaches flush threshold. If so, …\nMemtable builder provider for each region.\nCreates a flush task with specific <code>reason</code> for the <code>region</code>.\nNotifies the whole group that a flush job is finished so …\nManages object stores for manifest and SSTs.\nFlush is finished successfully.\nOn later drop task is finished.\nEngine is stalled.\nThe opening regions.\nRegions that are opening.\nValidates and groups requests by region.\nPuffin manager factory for index.\nBackground purge job scheduler.\nScheduler for file purgers.\nPushes a stalled request to the buffer.\nRequest receiver.\nGauge of regions in the worker.\nQueues for region edit requests.\nRegions bound to the worker.\nRegions bound to the worker.\nRejects a specific region’s stalled requests.\nRejects all stalled requests.\nRemoves stalled requests of specific region.\nStalled requests.\nStarts the worker loop.\nWhether to run the worker thread.\nWhether the worker thread is still running.\nSchedule compaction for the region if necessary.\nDatabase level metadata manager.\nRequest sender.\nRequest sender.\nHandles <code>set_region_role_gracefully</code>.\nSets whether the worker is still running.\nReturns true if the engine needs to reject some write …\nGauge of stalled request count.\nStalled write requests.\nStarts a region worker and its background thread.\nStarts a worker group.\nStop the worker.\nStops the worker group.\nSubmits request to background worker thread.\nSubmits a request to a worker in the group.\nProvider to get current time.\nWAL of the engine.\nGet worker for specific <code>region_id</code>.\nComputes a initial check delay for a worker.\nWorkers of the group.\nEngine write buffer manager.\nCreates a metadata after applying the alter <code>request</code> to the …\nBackground GC task to remove the entire region path once …\nRemoves region dir if there is no parquet files, returns …\nA queue for temporary store region edit requests, if the …\nChecks the edit, writes and applies it.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nRejects delete request under append mode.\nChecks the schema and fill missing columns.\nSend rejected error to all <code>write_requests</code>.")